import tableFactory from './table-factory';

export default async function lifeExpectancyTable() {
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