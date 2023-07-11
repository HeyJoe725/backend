import Link from 'next/link';
import Layout from '../../components/layout';



export default function ResearchPapers() {

    const links = {
        'Pose-Based Gait Analysis for Diagnosis of Parkinson’s Disease': 'https://www.mdpi.com/1999-4893/15/12/474#sec2dot2-algorithms-15-00474',
        'A Wearable Gait Analysis System for Overstriding in Runners': 'chrome-extension://efaidnbmnnnibpcajpcglclefindmkaj/https://dash.harvard.edu/bitstream/handle/1/14398557/LIU-SENIORTHESIS-2015.pdf?sequence=1&isAllowed=y',
        'Marker-less motion capture system using OpenPose': 'https://www.spiedigitallibrary.org/conference-proceedings-of-spie/12101/2619059/Marker-less-motion-capture-system-using-OpenPose/10.1117/12.2619059.full?SSO=1',
        'Analytical Model of Action Fusion in Sports Tennis Teaching by Convolutional Neural Networks': 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9357763/',
        'OpenPose: Realtime Multi-Person 2D Pose Estimation Using Part Affinity Fields': 'https://ieeexplore.ieee.org/document/8765346',
        'Changes in Key Biomechanical Parameters According to the Expertise Level in Runners at Different Running Speeds': 'https://www.mdpi.com/2306-5354/9/11/616',
    }

    return (
        <Layout>
            <h1>Research Papers</h1>

            {Object.keys(links).map((name) => (
                <Link href={links[name]}>
                    <li key={`${name}research`}>{name}</li>
                </Link>
            ))}
        </Layout>
    );
}
