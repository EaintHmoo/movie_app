import React from "react";
import Head from "../Components/Head";
function AboutUs() {
  return (
    <div className="px-2 py-6 min-height-screen container mx-auto">
      <Head title="About Us" />
      <div className="xl:py-20 py-10 px-4">
        <div className="grid grid-flow-row xl:grid-cols-2 gap-4 xl:gap-16 items-center">
          <div className="grid gap-6">
            <h3 className="text-4xl font-semibold">Welcome to our Netflixo</h3>
            <div className="leading-8 mt-3 text-sm text-text">
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy
                text ever since the 1500s, when an unknown printer took a galley
                of type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-6 mt-8">
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold">10K</span>
                <p className="text-lg font-semibold my-2">Listed Movies</p>
                <p className="text-text leading-7 text-sm mb-0">
                  Lorem Ipsum is simply dummy text of the printing and
                </p>
              </div>
              <div className="p-8 bg-dry rounded-lg">
                <span className="text-3xl block font-extrabold">8K</span>
                <p className="text-lg font-semibold my-2">Lovely Users</p>
                <p className="text-text leading-7 text-sm mb-0">
                  Completely free, without registration! Lorem Ipsum is simply
                </p>
              </div>
            </div>
          </div>
          <div className="mt-0 lg:mt-10">
            <img
              src="/images/about2.jpg"
              alt="about-us"
              className="w-full h-header rounded-lg object-cover hidden xl:block"
            ></img>
          </div>
        </div>
      </div>
    </div>
  );
}
export default AboutUs;
