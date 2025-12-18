"use client";
import React from "react";
import { Card } from "@mantine/core";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const movies = [
  { id: 1, img: "/movie1.jpg" },
  { id: 2, img: "/movie2.jpg" },
  { id: 3, img: "/movie3.jpg" },
];

const courses = [
  { id: 1, img: "/course1.jpg" },
  { id: 2, img: "/course2.jpg" },
  { id: 3, img: "/course3.jpg" },
];

const books = [
  { id: 1, img: "/book1.jpg" },
  { id: 2, img: "/book2.jpg" },
  { id: 3, img: "/book3.jpg" },
  { id: 4, img: "/book4.jpg" },
];

export default function HeaderEntertainment() {
  return (
    <div className="grid md:grid-cols-2 gap-8 mb-12">
      {/* Right side: Movies full height */}
      <div>
        <Swiper
          spaceBetween={10}
          slidesPerView={1}
          direction="vertical"
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          modules={[Autoplay]}
          className="h-[600px] w-full"
        >
          {movies.map((movie) => (
            <SwiperSlide key={movie.id}>
              <Card shadow="md" radius="lg" className="overflow-hidden">
                <img
                  src={movie.img}
                  alt=""
                  className="w-full h-[600px] object-cover"
                />
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Left side: Courses + Books */}
      <div className="flex flex-col gap-8">
        {/* Courses */}
        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={1}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="h-[280px]"
          >
            {courses.map((course) => (
              <SwiperSlide key={course.id}>
                <Card shadow="md" radius="lg" className="overflow-hidden">
                  <img
                    src={course.img}
                    alt=""
                    className="w-full h-[280px] object-cover"
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Books */}
        <div>
          <Swiper
            spaceBetween={10}
            slidesPerView={3}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay]}
            className="h-[200px]"
          >
            {books.map((book) => (
              <SwiperSlide key={book.id}>
                <Card shadow="md" radius="lg" className="overflow-hidden">
                  <img
                    src={book.img}
                    alt=""
                    className="w-full h-[200px] object-cover"
                  />
                </Card>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
