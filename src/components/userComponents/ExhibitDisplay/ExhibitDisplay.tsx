import React from 'react';
import Image from 'next/image';
import styles from './ExhibitDisplay.module.css';

/**
 *
 * @param root0
 * @param root0.name
 * @param root0.location
 * @param root0.information
 * @param root0.description
 * @param root0.relatednews
 * @param root0.topimage
 * @param root0.media
 * @param root0.bottomimage
 * @param root0.moretext
 */
export default function ExhibitDisplay({
  name,
  location,
  information,
  description,
  relatednews,
  topimage,
  media,
  bottomimage,
  moretext,
}: {
  name: string;
  location: string;
  information: string;
  description: string;
  relatednews: string;
  topimage: string;
  media: string;
  bottomimage: string;
  moretext: string;
}) {
  return (
    <div className={styles.outercontainer}>
      <div className={styles.logobox}>
        <div className={styles.logo}>Logo</div>
      </div>
      <div className={styles.imagebox}>
        <Image src={topimage} alt="picture" width={500} height={224} priority />
      </div>

      <div className={styles.bottombox}>
        <div className={styles.namebox}>
          <h1 className={styles.nametext}>{name}</h1>
        </div>
        <p className={styles.locationtext}>{location}</p>
        <div className={styles.informationbox}>
          <h1 className={styles.informationtext}>{information}</h1>
        </div>
        <p className={styles.descriptiontext}>{description}</p>

        <Image src={media} alt="picture" width={390} height={224} priority />

        <div className={styles.relatednewsbox}>
          <h1 className={styles.relatedtext}>{relatednews}</h1>
        </div>

        <div className={styles.newsbox}>
          <div>
            <Image
              src={bottomimage}
              alt="picture"
              width={146}
              height={120}
              priority
            />
          </div>
          <div className={styles.moretextbox}>
            <p className={styles.relatedtext}>{moretext}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
