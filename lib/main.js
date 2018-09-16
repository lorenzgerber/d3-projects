import * as d3 from 'd3';

const chart = d3.select('body')
.append('svg')
.attr('id', 'chart');

const req = new window.XMLHttpRequest();
req.addEventListener('load', mungeData);
req.open('GET', 'data/EU-referendum-result-data.csv');
req.send();

function mungeData(){
    const data = d3.csvParse(this.responseText);
    const regions = data.reduce((last, row) => {
        if (!last[row.Region]) last[row.Region] = [];
        last[row.Region].push(row);
        return last
    }, {});
        
    const regionsPctTurnout = Object.entries(regions)
        
    .map(([region, areas]) => ({
        region,
        meanPctTurnhout: d3.mean(areas, d => d.Pct_Turnout),    
    }));

    renderChart(regionsPctTurnout);
}

function renderChart(data) {
    chart.attr('width', window.innerWidth)
    .attr('height', window.innerHeight);

    const x = d3.scaleBand()
    .domain(data.map(d => d.retion))
    .rangeRound([50, window.innerWidth - 50])
    .padding(0.1);

    const y = d3. scaleLinear()
    .domain([0, d3.max(data, d => c.meanPctTurnout)])
    .range([window.innerHeight - 50, 0]);

    const xAxis = d3.axisBottom().scale(x);
    const yAxis = d3.axisLeft().scale(y);
    

}