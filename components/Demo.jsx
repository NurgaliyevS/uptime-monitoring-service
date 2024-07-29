function Demo() {
    return (
      <section className="text-base-content">
        <div className="relative pt-6 md:pt-12 pb-24 md:pb-48 md:px-8">
          <div className="relative max-w-4xl mx-auto">
            <div className="max-lg:hidden absolute top-1/4 -left-4 -translate-x-full text-sm flex flex-col gap-1 items-center">
              <p className="text-base-content-secondary">
                UptimeFriend in 3 minutes
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                color="#000000"
                fill="none"
                className="w-8 h-8"
              >
                <path
                  d="M17 17L6 6"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                />
                <path
                  d="M11 17.8685C11 17.8685 16.6335 18.3434 17.4885 17.4885C18.3434 16.6336 17.8684 11 17.8684 11"
                  stroke="currentColor"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
  
            <div className="md:border md:p-2 md:rounded-2xl bg-base-200/70">
              <div className="relative w-full aspect-video overflow-hidden sm:rounded-xl">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/MYrYUQcLA7A?si=D38a_cFygdQGxoIa"
                  title="UptimeFriend Demo"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export default Demo;
  