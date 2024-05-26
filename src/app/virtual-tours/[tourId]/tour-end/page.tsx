'use client';

import Link from 'next/link';
import React, { useEffect, useState } from 'react';

import NavBar from '../../../../components/userComponents/NavBar/NavBar';
import { TourRow, TourDisplaysRow } from '../../../../types/types';
import { fetchTour } from '../../../../supabase/tours/queries';
import { fetchTourDisplays } from '../../../../supabase/tour_displays/queries';
import { BackArrow, Congratulations } from '../../../../../public/icons';
import ButtonWithText from '../../../../components/userComponents/ButtonWithText/ButtonWithText';
import RelatedLinks from '../../../../components/userComponents/RelatedLinks/RelatedLinks';
import Footer from '../../../../components/userComponents/Footer/Footer';

/**
 * @param params -
 * @param params.params -
 * @param params.params.tourId - The tour ID
 * @returns The tour end page
 */
export default function TourEndPage({
  params,
}: {
  params: { tourId: string };
}) {
  const [tour, setTour] = useState<TourRow>();
  const [backLink, setBackLink] = useState<string>(
    `/virtual-tours/${params.tourId}`,
  );
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    // Fetch tour and back link data
    const fetchData = async () => {
      const fetchedTour = await fetchTour(params.tourId);
      setTour(fetchedTour);
      const tourDisplays: TourDisplaysRow[] = await fetchTourDisplays(
        params.tourId,
      );
      setBackLink(
        `/virtual-tours/${params.tourId}/${
          tourDisplays[tourDisplays.length - 1].display_id
        }`,
      );
    };

    fetchData();
  }, [params.tourId]);

  useEffect(() => {
    if (window) {
      setIsWide(window.innerWidth >= 1024);
    }
    // Update isWide state on window resize
    const handleResize = () => setIsWide(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return isWide ? (
    <div className="bg-ivory w-full min-h-screen flex flex-col">
      <NavBar />
      <div className="flex flex-col flex-grow justify-center">
        <div className="flex flex-col gap-[3.12rem] py-[10rem] items-center">
          <div className="flex flex-col items-center gap-[2.62rem] mx-[3.47rem]">
            <div className="flex flex-col gap-3 text-center">
              <div className="flex flex-col items-center gap-5 mx-[2.34rem]">
                <Congratulations />
                <h2 className="text-night">
                  You’ve reached the end of this tour!
                </h2>
              </div>
              <p className="b3 text-night">Thanks for visiting {tour?.name}.</p>
            </div>
            <Link href="/virtual-tours">
              <div className="w-[13.75rem] h-[2.5625rem]">
                <ButtonWithText text="Back to Virtual Tours" />
              </div>
            </Link>
          </div>
          <div className="w-[24.375rem]">
            <RelatedLinks />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  ) : (
    <div className="bg-ivory min-h-screen">
      <NavBar />
      <div className="flex flex-col flex-grow py-4">
        <Link href={backLink} className="pl-[1.12rem] mb-[1.81rem]">
          <BackArrow />
        </Link>
        <div className="flex flex-col flex-grow items-center justify-center gap-[3.25rem]">
          <div className="flex flex-col items-center gap-6 mx-[3.47rem]">
            <div className="flex flex-col gap-3 text-center">
              <div className="flex flex-col items-center gap-5 mx-[2.34rem]">
                <Congratulations />
                <h2 className="text-night">
                  You’ve reached the end of this tour!
                </h2>
              </div>
              <p className="b3 text-night">Thanks for visiting {tour?.name}.</p>
            </div>
            <Link href="/virtual-tours">
              <div className="w-[13.75rem] h-10">
                <ButtonWithText text="Back to Virtual Tours" />
              </div>
            </Link>
          </div>
          <div className="w-[24.375rem] pb-6">
            <RelatedLinks />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
