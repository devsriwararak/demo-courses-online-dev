

import Part1 from "./part1";
import Part2 from "./part2";
import Part3 from "./part3";
import Part4 from "./part4";
import Part5 from "./part5";
import Part6 from "./part6";
import Part7 from "./part7";


// import { useRouter } from 'next/router';

const HomeTH = () => {
//   const { locale } = useRouter();
  return (
    <div>
      <div style={{ margin: 0, padding: 0 }}>
      <Part1 />
      {/* <Part2 /> */}
      <Part3 />
      <Part4 />
      <Part5 />
      <Part6 />
      <Part7 />
      {/* <Part8 /> */}
    </div>
    </div>
  );
};

export default HomeTH;