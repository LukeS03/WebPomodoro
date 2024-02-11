#A script to generate the 'Aubergine' stylesheet (basically darkmode.)
#Will be updated in the future for the 'Robot' theme.
#Palette source: https://coolors.co/palette/7c9eb2-52528c-372554-231123-000000

if test -f aubergine.css; then
    rm aubergine.css
fi
cp style.css aubergine.css
sed -i -e "s/tomato/#8a8aa6/g" aubergine.css
sed -i -e "s/#ffe3de/#372554/g" aubergine.css
sed -i -e "s/#ffa595/#848494/g" aubergine.css
sed -i -e "s/white/#231123/g" aubergine.css
sed -i -e "s/🍅/🍆/g" aubergine.css

