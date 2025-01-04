interface MetricProps {
  displayHeader: string;
  displayValue: string | number;
  bgColor?: string;
}
function Metric({
  displayHeader,
  displayValue,
  bgColor = "yellow",
}: MetricProps) {
  const bgColorClass = `text-center p-4 bg-${bgColor}-100`;
  const formattedHeader = displayHeader.replace(/ft2/g, "ft<sup>2</sup>");

  return (
    <>
      <div className={bgColorClass}>
        <p
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: formattedHeader }}
        />
        <p className="text-4xl font-bold mt-4">{displayValue}</p>
      </div>
    </>
  );
}

export default Metric;
