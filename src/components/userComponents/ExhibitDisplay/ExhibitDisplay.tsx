import React from 'react';
import Image from 'next/image';
// eslint-disable-next-line import/no-unresolved
import styles from './ExhibitDisplay.module.css';

/**
 * ExhibitDisplay component
 * @param  props - props for the ExhibitDisplay component
 * @param  props.name - name of the exhibit
 * @param  props.location - location of the exhibit
 * @param  props.information - information about the exhibit
 * @param  props.description - description of the exhibit
 * @param  props.relatednews - related news of the exhibit
 * @param  props.topimage - top image of the exhibit
 * @param  props.media - media of the exhibit
 * @param  props.bottomimage - bottom image of the exhibit
 * @param  props.moretext - more text of the exhibit
 * @returns JSX.Element
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
