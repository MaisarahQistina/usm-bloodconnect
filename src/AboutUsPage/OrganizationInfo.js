import React from "react";
import styles from "./OrganizationInfo.module.css";

function OrganizationInfo() {
  return (
    <section className={styles.organizationInfo}>
      <img
        src="https://cdn.builder.io/api/v1/image/assets/TEMP/a7ad33943a58568550a45947612919e2eceda92f8efe6faa50c6cf9fa4149c1d?apiKey=c78782b587ef483eb6a7cfa02a7de9d2&"
        alt="Pusat Sejahtera building"
        className={styles.image}
      />
      <div className={styles.content}>
        <h2 className={styles.title}>Who are we?</h2>
        <p className={styles.description}>
          <strong>Pusat Sejahtera</strong> (Health & Dental) is the official
          medical establishment of Universiti Sains Malaysia (USM) in Penang and
          was established in 1969 that is located at building H29 in USM Main
          Campus. Pusat Sejahtera provides medical services to USM students,
          staff and also the public encompassing general medical consultations,
          health screenings, vaccination services, and dental care.
        </p>
        <p className={styles.description}>
          Today, Pusat Sejahtera is going beyond routine care to make a
          difference—saving lives through the incredible act of blood donation.
        </p>
        <p className={styles.description}>
          We extend this hand to ask you to join us!
        </p>
      </div>
    </section>
  );
}

export default OrganizationInfo;
