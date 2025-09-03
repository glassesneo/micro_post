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
          packages = [
            pkgs.typescript-language-server
            pkgs.nodejs
            pkgs.pnpm
            pkgs.biome
            # pkgs.nodePackages.prisma
            # pkgs.prisma-engines
            # pkgs.sqlite
          ];
          shellHook = ''
            # SQLite database setup
            # export DATABASE_DIR="$PWD/.nix-data"
            # export DATABASE_FILE="$DATABASE_DIR/dev.db"
            # export DATABASE_URL="file:$DATABASE_FILE"

            # Create data directory
            # mkdir -p "$DATABASE_DIR"

            # Create empty database file if it doesn't exist
            # if [ ! -f "$DATABASE_FILE" ]; then
            #   touch "$DATABASE_FILE"
            # fi

            # Generate Prisma client if schema exists
            # if [ -f "prisma/schema.prisma" ]; then
            #   pnpm prisma generate 2>/dev/null || true
            # fi
          '';
        }
    );
  };
}
