import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useUser } from "@/context/Context";
import { Translator, getTranslation } from '@miracleufo/react-g-translator';
import parse from 'html-react-parser';


function Responsive({ content }) {
    const { languaje } = useUser()

    var settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        // slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 8000,
        // cssEase: "linear",
        pauseOnHover: false,
        arrows: false,

    };
    return (
        <div className="slider-container ">
            <Slider {...settings} autoplay={true}>
                {content.map((i, index) => (
                    <div>
                        <div className='text-center w-[90vw] bg-gray-100 p-[50px] md:p-[100px] max-w-[800px]  rounded-[20px]' style={{ top: '0', bottom: '0', margin: 'auto' }}>
                            <p>

                                <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>

                                    {languaje === 'English' && i.paragraphEN
                                        ? i.paragraphEN !== undefined && parse(i.paragraphEN)
                                        : i.paragraph !== undefined && parse(i.paragraph)

                                    }
                                </Translator>
                            </p>
                            {/* {languaje === 'English' && i.paragraphEN
                                ? <p className='italic text-black' dangerouslySetInnerHTML={{ __html: i.paragraphEN }}></p>

                                : <Translator from='es' to={languaje.slice(0, 2).toLowerCase()}>
                                    <p className='italic text-black' dangerouslySetInnerHTML={{ __html: i.paragraph }}></p>
                                </Translator>} */}

                            <br />
                            <h4 className='font-bold italic text-black'>{i.title}</h4>
                        </div>
                    </div>
                ))}
            </Slider>
        </div>
    );
}


export default Responsive;
