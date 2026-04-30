interface DashbookingLandingSectionHeadingProps {
  readonly eyebrow: string;
  readonly title: string;
}

export function DashbookingLandingSectionHeading({
  eyebrow,
  title,
}: DashbookingLandingSectionHeadingProps) {
  return (
    <div className="section-heading stack-md">
      <span className="eyebrow">{eyebrow}</span>
      <h2 className="title-lg">{title}</h2>
    </div>
  );
}
