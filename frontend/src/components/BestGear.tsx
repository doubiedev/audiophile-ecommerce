import bestGear from "../assets/shared/desktop/image-best-gear.jpg";

const BestGear = () => {
    return (
        <section className="flex items-center gap-[125px]">
            <div className="flex flex-col gap-[2rem]">
                <h2>
                    Bringing you the{" "}
                    <span className="text-orange-dark">best</span> audio gear
                </h2>
                <p className="opacity-50">
                    Located at the heart of New York City, Audiophile is the
                    premier store for high end headphones, earphones, speakers,
                    and audio accessories. We have a large showroom and luxury
                    demonstration rooms available for you to browse and
                    experience a wide range of our products. Stop by our store
                    to meet some of the fantastic people who make Audiophile the
                    best place to buy your portable audio equipment.
                </p>
            </div>
            <img
                src={bestGear}
                alt="Man with headphones"
                className="rounded-lg"
            />
        </section>
    );
};

export default BestGear;
