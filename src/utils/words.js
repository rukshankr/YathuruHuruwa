import { paralist} from './sinhala';

var i =0; 
export const generate = (level = 0, count = 10) => {
    var lvl = level;
    //return new Array(count).fill().map(_ => sinhalaRand()).join(' ');
    //return new Array(count).fill().map(_ => paralist[(i++)%paralist.length]).join(' ');
    return new Array(count).fill().map(_ => paralist(lvl)[(i++)%paralist(lvl).length]).join(' ');
    
};

