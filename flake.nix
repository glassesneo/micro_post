{
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixpkgs-unstable";
  };

  outputs = {nixpkgs, ...}: let
    allSystems = [
      "aarch64-darwin"
      "x86_64-darwin"
      "aarch64-linux"
      "x86_64-linux"
    ];
    forAllSystems = fn: nixpkgs.lib.genAttrs allSystems (system: fn system nixpkgs.legacyPackages.${system});
  in {
    devShell = forAllSystems (
      system: pkgs:
        pkgs.mkShell {
          packages = with pkgs; [
            typescript-language-server
            nodejs
            pnpm
            turbo
            biome
            postgresql
          ];
          shellHook = ''
            export PGDATA="$PWD/.nix-data/postgres"
            export PGHOST="localhost"
            export PGPORT="5432"
            export PGDATABASE="micropost_dev"
            export PGUSER="$(whoami)"
            export DATABASE_URL="postgresql://$PGUSER@$PGHOST:$PGPORT/$PGDATABASE"
            export PGPASSWORD="development"

            mkdir -p "$PGDATA"

            # Initialize PostgreSQL database if not exists
            if [ ! -f "$PGDATA/PG_VERSION" ]; then
              echo "Initializing PostgreSQL database..."
              initdb -D "$PGDATA" --auth-local=md5 --auth-host=md5 --no-locale --encoding=UTF8
            fi

            # PostgreSQL起動スクリプト
            cat > pgstart << 'STARTSCRIPT'
            #!/usr/bin/env bash
            if pg_ctl -D "$PGDATA" status > /dev/null 2>&1; then
              echo "PostgreSQL is already running"
              exit 0
            fi

            echo "Starting PostgreSQL server..."
            pg_ctl -D "$PGDATA" -l "$PGDATA/postgres.log" start

            # Wait for PostgreSQL to be ready
            for i in {1..30}; do
              if pg_isready -h localhost -p 5432 > /dev/null 2>&1; then
                break
              fi
              sleep 0.5
            done

            # Set up user and password
            psql postgres -c "CREATE USER $PGUSER WITH PASSWORD '$PGPASSWORD';" 2>/dev/null || \
            psql postgres -c "ALTER USER $PGUSER WITH PASSWORD '$PGPASSWORD';" 2>/dev/null || true

            # Create database if it doesn't exist
            if ! psql postgres -lqt | cut -d \| -f 1 | grep -qw "$PGDATABASE" 2>/dev/null; then
              echo "Creating database: $PGDATABASE"
              createdb -O "$PGUSER" "$PGDATABASE" 2>/dev/null || true
            fi

            # Start directory watcher in background
            nohup bash -c '
              PROJECT_DIR="$PWD"
              while true; do
                sleep 5
                # Check if we are still in the project directory
                if [[ "$PWD" != "$PROJECT_DIR"* ]] || ! pgrep -f "direnv.*$PROJECT_DIR" > /dev/null 2>&1; then
                  echo "Left project directory, stopping PostgreSQL..." >> "$PGDATA/watcher.log"
                  pg_ctl -D "$PGDATA" stop -m fast 2>/dev/null || true
                  exit 0
                fi
              done
            ' > "$PGDATA/watcher.log" 2>&1 &
            echo $! > "$PGDATA/watcher.pid"

            echo "PostgreSQL started!"
            STARTSCRIPT

            chmod +x pgstart

            # PostgreSQL停止スクリプト
            cat > pgstop << 'STOPSCRIPT'
            #!/usr/bin/env bash
            if [ -f "$PGDATA/watcher.pid" ]; then
              kill $(cat "$PGDATA/watcher.pid") 2>/dev/null || true
              rm -f "$PGDATA/watcher.pid"
            fi
            pg_ctl -D "$PGDATA" stop -m fast
            echo "PostgreSQL stopped!"
            STOPSCRIPT

            chmod +x pgstop

            # Create .env
            mkdir -p ./backend
            cat > ./backend/.env << EOF
            DB_HOST=$PGHOST
            DB_USER=$PGUSER
            DB_PASS=$PGPASSWORD
            DB_NAME=$PGDATABASE
            EOF

            echo ""
            echo "🐘 PostgreSQL environment ready!"
            echo ""
            echo "📌 Commands:"
            echo "   ./pgstart  - Start PostgreSQL (with auto-stop when leaving directory)"
            echo "   ./pgstop   - Stop PostgreSQL manually"
            echo ""
          '';
        }
    );
  };
}
