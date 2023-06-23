import { utilityValue } from './Utility.constants';

export default function Utility() {
  return (
    <div className="my-10">
      <h2 className="pb-10 text-[64px] font-light">Utility</h2>
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {utilityValue.map((data, i) => (
          <div className="flex gap-5" key={i}>
            <div className="my-0 text-[200px] font-black leading-[150px]">{data.thumbnail}</div>
            <div>{data.description}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
