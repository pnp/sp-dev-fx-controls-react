import { IData } from "../../../controls/worldMap/IData";
import { IWorldMapProps } from '../../../controls/worldMap';
import MaplibreWorldMap from '../../../controls/worldMap/WorldMapControl';
import React from "react";

const WorldMap: React.FC<IWorldMapProps> = (props) => {

  const countries: IData[] = React.useMemo(
    () => [
      { id:"us", name:"Microsoft – USA", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-us", coordinates:[-95.7129,37.0902] },
      { id:"canada", name:"Microsoft – Canada", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-ca", coordinates:[-79.3832,43.6532] },
      { id:"mexico", name:"Microsoft – Mexico", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/es-mx", coordinates:[-99.1332,19.4326] },
      { id:"brazil", name:"Microsoft – Brazil", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/pt-br", coordinates:[-46.6333,-23.5505] },
      // Europe
      { id:"portugal", name:"Microsoft – Portugal", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/pt-pt", coordinates:[-9.1393,38.7223] },
      { id:"uk", name:"Microsoft – United Kingdom", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-gb", coordinates:[-0.1276,51.5074] },
      { id:"ireland", name:"Microsoft – Ireland", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-ie", coordinates:[-6.2603,53.3498] },
      { id:"france", name:"Microsoft – France", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fr-fr", coordinates:[2.3522,48.8566] },
      { id:"germany", name:"Microsoft – Germany", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/de-de", coordinates:[11.5820,48.1351] },
      { id:"italy", name:"Microsoft – Italy", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/it-it", coordinates:[12.4964,41.9028] },
      { id:"spain", name:"Microsoft – Spain", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/es-es", coordinates:[-3.7038,40.4168] },
      { id:"sweden", name:"Microsoft – Sweden", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/sv-se", coordinates:[18.0686,59.3293] },
      { id:"switzerland", name:"Microsoft – Switzerland", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/de-ch", coordinates:[7.4474,46.9480] },
      { id:"norway", name:"Microsoft – Norway", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/nb-no", coordinates:[10.7522,59.9139] },
      { id:"finland", name:"Microsoft – Finland", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fi-fi", coordinates:[24.9384,60.1699] },
      { id:"denmark", name:"Microsoft – Denmark", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/da-dk", coordinates:[12.5683,55.6761] },
      { id:"netherlands", name:"Microsoft – Netherlands", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/nl-nl", coordinates:[4.8952,52.3702] },
      { id:"belgium", name:"Microsoft – Belgium", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/nl-be", coordinates:[4.3517,50.8503] },
      { id:"luxembourg", name:"Microsoft – Luxembourg", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fr-lu", coordinates:[6.1319,49.6116] },
      { id:"austria", name:"Microsoft – Austria", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/de-at", coordinates:[16.3738,48.2082] },
      { id:"poland", name:"Microsoft – Poland", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/pl-pl", coordinates:[21.0122,52.2297] },
      { id:"czech_republic", name:"Microsoft – Czech Republic", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/cs-cz", coordinates:[14.4208,50.0880] },
      { id:"slovakia", name:"Microsoft – Slovakia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/sk-sk", coordinates:[17.1077,48.1486] },
      { id:"hungary", name:"Microsoft – Hungary", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/hu-hu", coordinates:[19.0402,47.4979] },
      { id:"slovenia", name:"Microsoft – Slovenia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/sl-si", coordinates:[14.5058,46.0569] },
      { id:"croatia", name:"Microsoft – Croatia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/hr-hr", coordinates:[15.9819,45.8150] },
      { id:"serbia", name:"Microsoft – Serbia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/sr-latn-rs", coordinates:[20.4573,44.7872] },
      { id:"bosnia", name:"Microsoft – Bosnia and Herzegovina", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/bs-ba", coordinates:[18.4131,43.8563] },
      { id:"montenegro", name:"Microsoft – Montenegro", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/sr-latn-me", coordinates:[19.2629,42.4304] },
      { id:"albania", name:"Microsoft – Albania", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/sq-al", coordinates:[19.8187,41.3275] },
      { id:"macedonia", name:"Microsoft – North Macedonia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/mk-mk", coordinates:[21.4316,41.9981] },
      { id:"greece", name:"Microsoft – Greece", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/el-gr", coordinates:[23.7275,37.9838] },
      { id:"bulgaria", name:"Microsoft – Bulgaria", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/bg-bg", coordinates:[23.3219,42.6977] },
      { id:"romania", name:"Microsoft – Romania", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ro-ro", coordinates:[26.1025,44.4268] },
      { id:"moldova", name:"Microsoft – Moldova", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ro-md", coordinates:[28.8638,47.0105] },
      { id:"ukraine", name:"Microsoft – Ukraine", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/uk-ua", coordinates:[30.5234,50.4501] },
      { id:"belarus", name:"Microsoft – Belarus", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/be-by", coordinates:[27.5615,53.9045] },
      { id:"estonia", name:"Microsoft – Estonia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/et-ee", coordinates:[24.7536,59.4370] },
      { id:"latvia", name:"Microsoft – Latvia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/lv-lv", coordinates:[24.1052,56.9496] },
      { id:"lithuania", name:"Microsoft – Lithuania", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/lt-lt", coordinates:[25.2797,54.6872] },
      // Rest of the world (original list)
      { id:"russia", name:"Microsoft – Russia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ru-ru", coordinates:[37.6173,55.7558] },
      { id:"south_africa", name:"Microsoft – South Africa", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-za", coordinates:[28.0473,-26.2041] },
      { id:"uae", name:"Microsoft – UAE", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-ae", coordinates:[55.2708,25.2048] },
      { id:"india", name:"Microsoft – India", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-in", coordinates:[78.9629,20.5937] },
      { id:"china", name:"Microsoft – China", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/zh-cn", coordinates:[116.383,39.917] },
      { id:"hong_kong", name:"Microsoft – Hong Kong", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/zh-hk", coordinates:[114.1095,22.3964] },
      { id:"japan", name:"Microsoft – Japan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ja-jp", coordinates:[139.6917,35.6895] },
      { id:"south_korea", name:"Microsoft – South Korea", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ko-kr", coordinates:[126.9780,37.5665] },
      { id:"australia", name:"Microsoft – Australia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-au", coordinates:[151.2093,-33.8688] },
      { id:"new_zealand", name:"Microsoft – New Zealand", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-nz", coordinates:[174.88597,-40.90056] },
      { id:"singapore", name:"Microsoft – Singapore", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-sg", coordinates:[103.8198,1.3521] },
      { id:"malaysia", name:"Microsoft – Malaysia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-my", coordinates:[101.6869,3.1390] },
      { id:"philippines", name:"Microsoft – Philippines", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-ph", coordinates:[121.7740,12.8797] },
      { id:"thailand", name:"Microsoft – Thailand", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/th-th", coordinates:[100.5018,13.7563] },
      { id:"indonesia", name:"Microsoft – Indonesia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/id-id", coordinates:[106.8456,-6.2088] },
      { id:"vietnam", name:"Microsoft – Vietnam", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/vi-vn", coordinates:[105.8442,21.0278] },
      { id:"bangladesh", name:"Microsoft – Bangladesh", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/bn-bd", coordinates:[90.4125,23.8103] },
      { id:"pakistan", name:"Microsoft – Pakistan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ur-pk", coordinates:[67.0011,24.8607] },
      { id:"egypt", name:"Microsoft – Egypt", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-eg", coordinates:[31.2357,30.0444] },
      { id:"morocco", name:"Microsoft – Morocco", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fr-ma", coordinates:[-7.5898,33.5731] },
      { id:"kenya", name:"Microsoft – Kenya", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-ke", coordinates:[36.8219,-1.2921] },
      { id:"ghana", name:"Microsoft – Ghana", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-gh", coordinates:[-0.1869,5.6037] },
      { id:"ivory_coast", name:"Microsoft – Côte d'Ivoire", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fr-ci", coordinates:[-4.0083,5.3453] },
      { id:"algeria", name:"Microsoft – Algeria", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fr-dz", coordinates:[3.0588,36.7538] },
      { id:"nigeria", name:"Microsoft – Nigeria", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-ng", coordinates:[3.3792,6.5244] },
      { id:"tunisia", name:"Microsoft – Tunisia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/fr-tn", coordinates:[10.1815,36.8065] },
      { id:"saudi_arabia", name:"Microsoft – Saudi Arabia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-sa", coordinates:[46.6753,24.7136] },
      { id:"qatar", name:"Microsoft – Qatar", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-qa", coordinates:[51.5310,25.2854] },
      { id:"kuwait", name:"Microsoft – Kuwait", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-kw", coordinates:[47.9783,29.3759] },
      { id:"oman", name:"Microsoft – Oman", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-om", coordinates:[58.3829,23.5880] },
      { id:"bahrain", name:"Microsoft – Bahrain", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-bh", coordinates:[50.5832,26.0667] },
      { id:"lebanon", name:"Microsoft – Lebanon", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-lb", coordinates:[35.5018,33.8938] },
      { id:"jordan", name:"Microsoft – Jordan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ar-jo", coordinates:[35.9106,31.9632] },
      { id:"israel", name:"Microsoft – Israel", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/he-il", coordinates:[34.7818,32.0853] },
      { id:"kazakhstan", name:"Microsoft – Kazakhstan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/kk-kz", coordinates:[76.8860,43.2389] },
      { id:"uzbekistan", name:"Microsoft – Uzbekistan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/uz-uz", coordinates:[69.2401,41.2995] },
      { id:"azerbaijan", name:"Microsoft – Azerbaijan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/az-latn-az", coordinates:[49.8671,40.4093] },
      { id:"georgia", name:"Microsoft – Georgia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ka-ge", coordinates:[44.7930,41.7151] },
      { id:"armenia", name:"Microsoft – Armenia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/hy-am", coordinates:[44.5090,40.1792] },
      { id:"turkmenistan", name:"Microsoft – Turkmenistan", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/tm-tm", coordinates:[58.3833,37.9500] },
      { id:"mongolia", name:"Microsoft – Mongolia", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/mn-mn", coordinates:[106.9155,47.8864] },
      { id:"sri_lanka", name:"Microsoft – Sri Lanka", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/en-lk", coordinates:[79.8612,6.9271] },
      { id:"nepal", name:"Microsoft – Nepal", imageUrl:"https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg", link:"https://www.microsoft.com/ne-np", coordinates:[85.3240,27.7172] }
    ],
    []
  );

  return (
    <section>
      <MaplibreWorldMap
        theme={props.theme}
        data={countries}
        onClick={(c) => console.log('Clicked', c)}
        mapKey="fYK99t1qjkKbINH0saMD"
        title="Microsoft Locations Worldwide"
      />
    </section>
  );
};

export default WorldMap;
