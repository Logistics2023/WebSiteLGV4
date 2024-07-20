import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function Responsive({ content, rtl }) {
	var settings = {
		dots: false,
		infinite: true,
		slidesToShow: 3,
		// slidesToScroll: 1,
		autoplay: true,
		speed: 4000,
		autoplaySpeed: 4000,
		cssEase: "linear",
		pauseOnHover: false,
		arrows: false,
		rtl: rtl ? true : false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 2,

				}
			}
		]

	};
	return (
		<div className="slider-container">
			<Slider {...settings} autoplay={true}>
				{content.map((item, index) => (
					<div className="border-b-[3px] border-double border-yellow-500 border-spacing-5">
						<img className='h-[50px] md:h-[100px] w-auto' src={item.url} alt="" />
					</div>
				))}
			</Slider>
		</div>
	);
}


export default Responsive;
















// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";


// import Carousel from "react-multi-carousel";
// import "react-multi-carousel/lib/styles.css";
// function Responsive({ content }) {
// 	var settings = {
// 		dots: false,
// 		infinite: true,
// 		slidesToShow: 3,
// 		// slidesToScroll: 1,
// 		autoplay: true,
// 		speed: 2000,
// 		autoplaySpeed: 2000,
// 		cssEase: "linear",
// 		pauseOnHover: false,
// 		arrows: false,

// 	};
// 	return (
// 		<Carousel
// 			additionalTransfrom={0}
// 			arrows={false}
// 			autoPlay
// 			autoPlaySpeed={.5}
// 			centerMode={false}
// 			className=""
// 			containerClass="container"
// 			customTransition="all 5s linear"
// 			dotListClass=""
// 			draggable={false}
// 			focusOnSelect={false}
// 			infinite
// 			itemClass=""
// 			keyBoardControl
// 			minimumTouchDrag={80}
// 			pauseOnHover={false}
// 			renderArrowsWhenDisabled={false}
// 			renderButtonGroupOutside={false}
// 			renderDotsOutside={false}
// 			responsive={{
// 				desktop: {
// 					breakpoint: {
// 						max: 3000,
// 						min: 1024
// 					},
// 					items: 3,
// 					partialVisibilityGutter: 40
// 				},
// 				mobile: {
// 					breakpoint: {
// 						max: 464,
// 						min: 0
// 					},
// 					items: 1,
// 					partialVisibilityGutter: 30
// 				},
// 				tablet: {
// 					breakpoint: {
// 						max: 1024,
// 						min: 464
// 					},
// 					items: 2,
// 					partialVisibilityGutter: 30
// 				}
// 			}}
// 			rewind={false}
// 			rewindWithAnimation={false}
// 			rtl={false}
// 			shouldResetAutoplay={false}
// 			showDots={false}
// 			sliderClass=""
// 			slidesToSlide={2}
// 			swipeable
// 			transitionDuration={5000}
// 		>
// 			{content.map((item, index) => (

// 						<img className='h-[100px] w-auto' src={item.url} alt="" />

// 				))}
// 		</Carousel>
// 	);
// }

// export default Responsive;




























