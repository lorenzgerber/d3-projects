import * as d3 from 'd3';
import chartFactory from '../common/index';
import tableFactory from './table-factory';

export async function lifeExpectancyTable() {
    const getData = async () => {
        try {
            const response = await fetch('data/who-gho-life-expectancy.json');
            const raw = await response.json();

            return raw.fact.filter(d => d.dims.GHO === 'Life expectancy at birth (years)' && d.dims.SEX === 'Both sexes' && d.dims.YEAR === '2014').map( d=> [
                    d.dims.COUNTRY,
                    d.Value,
                ]);



        } catch (e) {
            console.error (e);
            return undefined;
            
        }
    };

    const data = await getData();
    data.unshift(['Country', 'Life expectancy (years from birth)']);
    return tableFactory(data).table
        .selectAll('tr')
        .filter(i => i)
        .sort(([countryA, yearsA], [countryB, yearsB]) => yearsA - yearsB);

}

export async function renderSVGStuff(){
    const chart = chartFactory();
    const text = chart.container.append('text')
        .text("ceci n'est pas un trajet!")
        .attr('x', 50)
        .attr('y', 200)
        .attr('text-anchor', 'start');

    const circle = chart.container.append('circle')
        .attr('cx', 350)
        .attr('cy', 250)
        .attr('r', 100)
        .attr('fill', 'green')
        .attr('fill-opacity', 0.5)
        .attr('stroke', 'steelblue')
        .attr('stroke-width', 2);
    
    const ellipse = chart.container.append('ellipse')
        .attr('cx', 350)
        .attr('cy', 250)
        .attr('rx', 80)
        .attr('ry', 7);
    
    const line = chart.container.append('line')
        .attr('x1', 10)
        .attr('y1', 10)
        .attr('x2', 100)
        .attr('y2', 100)
        .attr('stroke', 'blue')
        .attr('stroke-width', 3);

    const rect = chart.container.insert('rect', 'circle')
        .attr('x', 200)
        .attr('y', 50)
        .attr('width', 300)
        .attr('height', 400);

    rect.attr('stroke', 'green')
        .attr('stroke-width', 0.5)
        .attr('fill', 'white')
        .attr('rx', 20)
        .attr('ry',20);

    chart.container.selectAll('circle, ellipse')
        .transition()
        .duration(1800)
        .attr('transform', `translate(0, 0) 
        scale(1.0)
        translate(-800,-200)
        rotate(-20, ${350/1.2}, ${250/1.2})
        skewX(50)
        skewY(50)`);

    const fridu = chart.container.append('rect')
        .attr('x', 0)
        .attr('y', 0)
        .attr('width', 100)
        .attr('height', 200)
        .attr('stroke', 'blue')
        .attr('stroke-width', 5);

   fridu.transition()
    .duration(5000)
    .attr('transform', `translate(0,0)
    rotate(-90, 100, 200)
    translate(200, 100)`);

    

        
    


    
}