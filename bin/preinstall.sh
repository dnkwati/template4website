#!/usr/bin/env bash
#
# ------------------------------------------------------------------------------------------------------------------
# VARIABLES
# ------------------------------------------------------------------------------------------------------------------
readonly workDir=${workDir:-$PWD}
declare -a commands
declare composer
composer=$(which 'composer')
# resolve npm handler
declare handler
readonly -a handlers=('bun' 'pnpm' 'npm')
for val in "${handlers[@]}"; do
	bin=$(which "$val")
	if [ "$bin" ]; then
		handler="$bin"
		break
	fi
done
# BUILD COMMANDS
if [ ! -d "$workDir/vendor" ] && [ -f "$workDir/composer.json" ]; then
	commands+=("$composer install" " && ")
fi
#
commands+=("$handler run bootstrap")
#
# EXECUTE
eval "${commands[*]}"
# ------------------------------------------------------------------------------------------------------------------
# END
# ------------------------------------------------------------------------------------------------------------------
