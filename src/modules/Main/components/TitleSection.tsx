export interface ITitleSectionProps {
  name: string;
}

export default function TitleSection({ name }: ITitleSectionProps) {
  return (
    <div className="mb-5 ">
      <h2 className="text-[64px] font-light ">{name}</h2>
    </div>
  );
}
