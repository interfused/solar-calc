interface MetricProps {
  displayHeader: string;
  displayValue: string | number;
  bgColor?: string;
  testId: string;
}
function Metric({
  displayHeader,
  displayValue,
  bgColor = "yellow",
  testId,
}: MetricProps) {
  const bgColorClass = `text-center p-4 bg-${bgColor}-100`;
  const formattedHeader = displayHeader.replace(/ft2/g, "ft<sup>2</sup>");
  const testIdVal = `${testId}_value`;
  return (
    <>
      <div className={bgColorClass} id={testId} data-testid={testId}>
        <p
          className="font-bold"
          dangerouslySetInnerHTML={{ __html: formattedHeader }}
        />
        <p className="text-4xl font-bold mt-4" data-testid={testIdVal}>
          {displayValue}
        </p>
      </div>
    </>
  );
}

export default Metric;
