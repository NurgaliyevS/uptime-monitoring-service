function Pricing(props) {
  return (
    <section className="bg-slate-800 text-gray-300 py-44 flex flex-col overflow-hidden">
      <div className="container max-w-7xl mx-auto">
        <div className="flex justify-center px-10 text-center mb-20 flex-col gap-10 lg:gap-14">
          <h2 className="font-extrabold text-4xl lg:text-6xl tracking-tight md:-mb-4">
            <strong className="relative text-secondary">Pricing</strong>
          </h2>
          <p className="text-xl opacity-80 leading-relaxed">
            Save <strong className="relative text-secondary">30%</strong> with
            annual billing<strong className="relative text-secondary">.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
