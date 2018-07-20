function colorFromHotSpot(status){
    if(status === "0") {
        return 'rgb(255, 0, 0)'
    } else {
        return 'rgb(0, 102, 255)'
    }
}



Plotly.d3.csv('https://raw.githubusercontent.com/ngpfresearch/PDmaps/master/RhodeIsland_Map2.csv', function(err, rows){
    function unpack(rows, key) {
        return rows.map(function(row) { return row[key]; });
    }

    scl = [[0, 'rgb(150,0,90)'],[0.125, 'rgb(0, 0, 200)'],[0.25,'rgb(0, 25, 255)'],[0.375,'rgb(0, 152, 255)'],[0.5,'rgb(44, 255, 150)'],[0.625,'rgb(151, 255, 0)'],[0.75,'rgb(255, 234, 0)'],[0.875,'rgb(255, 111, 0)'],[1,'rgb(255, 0, 0)']];

    let colors = unpack(rows, 'HotSpot').map(status => colorFromHotSpot(status));

    let zipCode =  unpack(rows, 'ZIP').map(disrict => "Zip code: " + disrict);
    let numberOfSchools =  unpack(rows, 'Number.of.Schools').map(disrict => "Number of schools: " + disrict);
    let contacts =  unpack(rows, 'Contacts').map(disrict => "Pipe drive contacts: " + disrict);

    let hoverText = zipCode.map(function(e, i) {
        return [e, numberOfSchools[i], contacts[i]];
    }).map(ar => ar[0] + "<br>" + ar[1]+ "<br>" + ar[2]);

    var data = [{
        type: 'scattermapbox',
        mode: 'markers',
        hoverinfo: 'text',
        text: hoverText,
        lon: unpack(rows, 'long'),
        lat: unpack(rows, 'reclat'),
        marker: {
            color: colors,
            colorscale: scl,
            cmin: 0,
            cmax: 1.4,
            reversescale: false,
            size: 15,
            opacity: 0.3
        },
        name: ''
    }];

    layout = {
        dragmode: 'zoom',
        hoverinfo: 'none',
        mapbox: {
            center: {
                lat: 41.7466901,
                lon: -71.3194833
            },
            domain: {
                x: [0, 1],
                y: [0, 1]
            },
            style: 'light',
            zoom: 8
        },
        margin: {
            r: 0,
            t: 0,
            b: 0,
            l: 0,
            pad: 0
        },
        height: 700,
        width: 1500,
        showlegend: false
    };

    Plotly.setPlotConfig({
        mapboxAccessToken: 'pk.eyJ1IjoicGhpbGlwYXhlbHJvZCIsImEiOiJjamlnZG5xdmkwMnJtM3BwbXU2dTlmejFsIn0.jwIPVEA8JfnDyRYKeFl3hw'
    });

    Plotly.newPlot('myDiv', data, layout);
});
