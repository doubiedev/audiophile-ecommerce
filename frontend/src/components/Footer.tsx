import LayoutContainer from "./LayoutContainer";
import NavLinks from "./NavLinks";
import Logo from "../assets/shared/desktop/logo.svg";
import FacebookIcon from "../assets/shared/desktop/icon-facebook.svg";
import TwitterIcon from "../assets/shared/desktop/icon-twitter.svg";
import InstagramIcon from "../assets/shared/desktop/icon-instagram.svg";

const Footer = () => {
    return (
        <footer className="bg-black-light">
            <LayoutContainer>
                <div className="absolute w-[101px] h-[4px] bg-orange-dark"></div>
                <section className="flex pt-[75px]">
                    <div className="flex-1">
                        <Logo />
                        <p className="text-white opacity-50 mt-[36px]">
                            Audiophile is an all in one stop to fulfill your
                            audio needs. We're a small team of music lovers and
                            sound specialists who are devoted to helping you get
                            the most out of personal audio. Come and visit our
                            demo facility - we’re open 7 days a week.
                        </p>
                        <p className="text-white opacity-50 mt-[56px] pb-[3rem] text-bold">
                            Copyright 2021. All Rights Reserved
                        </p>
                    </div>

                    <div className="flex-1 flex flex-col items-end gap-[105px]">
                        <NavLinks />
                        <div className="flex gap-[1rem]">
                            <a
                                href="https://facebook.com"
                                target="_blank"
                                className="text-white hover:text-orange-dark"
                            >
                                <FacebookIcon />
                            </a>
                            <a
                                href="https://x.com"
                                target="_blank"
                                className="text-white hover:text-orange-dark"
                            >
                                <TwitterIcon />
                            </a>
                            <a
                                href="https://instagram.com"
                                target="_blank"
                                className="text-white hover:text-orange-dark"
                            >
                                <InstagramIcon />
                            </a>
                        </div>
                    </div>
                </section>
            </LayoutContainer>
        </footer>
    );
};

export default Footer;
