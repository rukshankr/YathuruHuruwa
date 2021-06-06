import { paralist} from './sinhala';

var i =0;
export const generate = (level, count = 10) => {

    //return new Array(count).fill().map(_ => sinhalize(faker.random.word())).join(' ');
    //return new Array(count).fill().map(_ => sinhalaRand()).join(' ');
    //return new Array(count).fill().map(_ => paralist[(i++)%paralist.length]).join(' ');
    return new Array(count).fill().map(_ => paralist(level)[(i++)%paralist(level).length]).join(' ');
    
};

