npx rpgmpacker \
--input "LPC" \
--output "dist" \
--rpgmaker "C:\\Program Files\\KADOKAWA\\RPGMZ" \
--debug \
--platforms "Browser"

cp -rv ./.github ./dist/Browser
cp -rv ./LPC/maps ./dist/Browser
sed -i 's/..\\\/..\\\/img/img\/img/' ./dist/Browser/maps/tilesets/*
sed -i 's/..\/..\/img/img\/img/' ./dist/Browser/maps/tilesets/*

npm run deploy

