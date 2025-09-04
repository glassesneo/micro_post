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
            biome
            postgresql
          ];
          shellHook = ''
            # PostgreSQL database setup
            export PGDATA="$PWD/.nix-data/postgres"
            export PGHOST="localhost"
            export PGPORT="5432"
            export PGDATABASE="micropost_dev"
            export PGUSER="$(whoami)"
            export DATABASE_URL="postgresql://$PGUSER@$PGHOST:$PGPORT/$PGDATABASE"
            export PGPASSWORD="development"

            # Create PostgreSQL data directory
            mkdir -p "$PGDATA"

            # Initialize PostgreSQL database if not exists
            if [ ! -f "$PGDATA/PG_VERSION" ]; then
              echo "Initializing PostgreSQL database..."
              initdb -D "$PGDATA" --auth-local=md5 --auth-host=md5 --no-locale --encoding=UTF8
            fi

            # Start PostgreSQL server
            if ! pgrep -x postgres > /dev/null; then
              echo "Starting PostgreSQL server..."
              pg_ctl -D "$PGDATA" -l "$PGDATA/postgres.log" start
              sleep 2

              # Set up user and password
              psql postgres -c "CREATE USER $PGUSER WITH PASSWORD '$PGPASSWORD';" 2>/dev/null || \
              psql postgres -c "ALTER USER $PGUSER WITH PASSWORD '$PGPASSWORD';" 2>/dev/null || true

              # Create database if it doesn't exist
              if ! psql postgres -lqt | cut -d \| -f 1 | grep -qw "$PGDATABASE" 2>/dev/null; then
                echo "Creating database: $PGDATABASE"
                createdb -O "$PGUSER" "$PGDATABASE" || echo "Database may already exist"
              fi
            fi

            # Create .env
            cat > ./backend/.env << EOF
            DB_HOST=$PGHOST
            DB_USER=$PGUSER
            DB_PASS=$PGPASSWORD
            DB_NAME=$PGDATABASE
            EOF

            echo "PostgreSQL is ready!"
            echo "To stop PostgreSQL: pg_ctl -D $PGDATA stop"
          '';
        }
    );
  };
}
