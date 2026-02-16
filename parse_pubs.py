
import re

publications_raw = [
    "1) Synthesis and Computational Studies of Novel Disulfide-Based Curing Cum Healing Agent for Self-healing Polyurethanes, AM Dhas, S Banerjee, Journal of Inorganic and Organometallic Polymers and Materials, 15741443",
    "2) Self‐Healing Polyurethane Binder with Catalytic Thermal Decomposition Property Based on Metal‐Ligand Interaction, AM Dhas, S Banerjee, Chemistry Select, 2365-6549",
    "3) Self‐Healing Polyurethane Binder with Catalytic Thermal Decomposition Property Based on Metal‐Ligand Interaction, Am Dhas, S Banerjee, Chemistryselect, 2023, 8 (10), E202203704",
    "4) A DFT Approach Towards Understanding the Thermal Stability of Tkx-50 And Their Key Precursors Through Band Gaps and Mesp, Pk Adak, Sunil Kumar Singh, Jaivindra Singh, Siribattula Mahesh, Mk Jain, P Anand Kumar Sagar, Shaibal Banerjee, Md Abdul Shafeeuulla Khan, Journal of Molecular Modeling 2022, 28 (12), 400",
    "5) Real-Time Transformer Oil Monitoring Using Planar Frequency-Based Sensor, R Srivastava, Y Kumar, S Banerjee, Sn Kale, Sensors and Actuators A: Physical 2022, 347, 113892",
    "6) Design And Development of Composite Propellant Using Cufe2o4 Spinel Decorated Graphene Oxide Nanocomposite as Novel Burn Rate Modifier, G Ar, Am Dhas, Rb Pawar, S Banerjee, Propellants, Explosives, Pyrotechnics 2022, 47 (11), E202200098",
    "7) Understanding The Thermal Stability of Tkx-50, Abtox and Their Key Precursors Through Band Gaps and Mesp: A Dft Approach, Pk Adak, Sk Singh, J Singh, S Mahesh, Mk Jain, S Banerjee, Mas Khan, 2022",
    "8) Self‐Healing of Htpb Based Polyurethane Binder Via Ring Opening Metathesis Polymerization, Am Dhas, K Ghosh, S Banerjee, Propellants, Explosives, Pyrotechnics 2022, 47 (10), E202100383",
    "9) Ultrasonically Assisted Solvohydrothermal Synthesis of Nanocrystalline Zn-Ni Ferrite Advanced Material for Emi Shielding, H Singh, S Parmar, B Ray, Vk Lokku, D Kumar, Kl Bhavani, D Nagaraju, S. Banerjee, Journal of Alloys and Compounds, 2022, 164199",
    "10) Fluorine-Containing 2, 3-Diaryl Quinolines as Potent Inhibitors of Methicillin and Vancomycin-Resistant Staphylococcus Aureus: Synthesis, Antibacterial Activity and Molecular S Janeoo, H Kaur, G Kaul, A Akhir, S Chopra, S Banerjee, V Kumar, Journal of Molecular Structure, 2021, 1244, 130924.",
    "11) Rheological Studies of Energetic Binder-Plasticizer Blends, D Kumari, S Banerjee, Materials Research Innovations, 2021, 25 (7), 434-441.",
    "12) Light Weight Htpb-Clay Nanocomposites (Hcn) With Enhanced Ablation Performance as Inhibition Materials for Composite Propellant, K Ghosh, Lv Gaikwad, Rk Kalal, Pa Kulkarni, A Kumar, S Banerjee, Defence Technology, 2021, 17 (2), 559-570",
    "13) 1, 2, 3‐Triazoles by Click Chemistry Using Azido Esters as A Precursor, D Kumari, S Banerjee, Propellants, Explosives, Pyrotechnics, 2021, 45 (12), 1845-1852.",
    "14) Novel Evaluation Enhancement Role of Poly (1-(3-Nitrophenyl)-1h-1, 2, 3-Triazol-4-Yl) Acrylate Materials for Propellant Composite Formulation, D Kumar, H Singh, M Maurya, Vh Nguyen, Dvn Vo, A Sharma, S. Banerjee, Materials Letters, 2020, 280, 128585.",
    "15) Fe3o4-Mediated Dielectric Sensor Using Metamaterial-Inspired Resonators for The No2 Sensing, V Kale, C Chavan, D Sable, Kg Girija, S Banerjee, Sn Kale, Applied Physics 2020, A 126, 1-8",
    "16) Preparation Of Reduced Sensitivity Co-Crystals of Cyclic Nitramines Using Spray Flash Evaporation, M Ghosh, Ak Sikder, S Banerjee, Mb Talawar, N Sikder, Defence Technology 2020, 16 (1), 188-200",
    "17) Composite Propellant Formulation of Poly (16-, 32-And 64-) Azido Dendritic Esters as Energetic Plasticizer and Evaluation of Properties, Kdb Yamajala, H Singh, R Kurva, M Maurya, S Banerjee, Central European Journal of Energetic Materials 2020, 17 (4), 506-522",
    "18) Sonochemically Assisted Synthesis of Nano Hmx, Singh, H., Jahagirdar, N., Banerjee, S., Defence Technology, 2019, 15 (6), 837-843.",
    "19) Cn Cross Coupling: Novel Approach Towards Effective Aryl Secondary Amines Modification on Nanodiamond Surface, P Gaur, S Banerjee, Diamond and Related Materials 2019, 98, 107468",
    "20) Oxone-Sodium Nitrite Mediated N-Nitrosamines Formation Under Mild Conditions from Secondary Amines, P Gaur, S Banerjee, Synthetic Communications, 2019, 49 (17), 2270-2279",
    "21) Htpb-Clay Nanocomposites (Hcn): An Efficient Burning Rate Catalyst for Composite Propellant, Ghosh, K., Chimurkar, D. Kumar, G., Banerjee, S., Gupta, M., (2019), Propellants, Explosives, Pyrotechnics, 44, Pp. 637-646.",
    "22) Influence Of Dispersion Methods on The Mechanical, Thermal and Rheological Properties of Htpb-Based Nanocomposites: Possible Binders for Composite Propellants, K Ghosh, A Kumar, S Banerjee, Us Patro, M Gupta, Central European Journal of Energetic Materials 2019, 16 (2)",
    "23) Nanostructured Energetic Composites: An Emerging Paradigm, H Singh, S Banerjee, Nano-Energetic Materials, 2019, 37-80",
    "24) P.K. Sharma, B.P. Patel, Harbans Lal, “Blast Valve Design and Related Studies : A Review” Defence Science Journal, Vol. 66, No. 3, May 2016, pp. 242-250, DOI : 10.14429/dsj.66.9618 (Impact Factor = 0.500, JCR2016, eISSN: 0976-464X)",
    "25) A.V. Ullas, P.K. Sharma, P. Chandel, P. Sharma, D. Kumar, D. Kumar, and P.K. Roy “Epoxy-glass Microballoon Syntactic Foams for Blast Mitigating Applications” Defence Science Journal, Vol. 68, No. 2, March 2018, pp. 210-217, DOI : 10.14429/dsj.68.12048 (Impact Factor = 0.500, JCR2016, eISSN: 0976-464X)",
    "26) N. Iqbala, P.K. Sharma, D. Kumar and P. K. Roy “Protective polyurea coatings for enhanced blast survivability of concrete” Journal of Construction and Building materials, Elsevier. Volume 175, 30 June 2018, Pages 682-690 (https://doi.org/10.1016/j.conbuildmat.2018.04.204) (5-Year Impact Factor – 3.703, ISSN: 0950-0618)",
    "27) Ajay Dubey & P. K. Sharma “Thermal study of 155 mm gun barrel- A Review” Defence Science Journal, Vol. 72, Iss. 2, (Mar 2022): 172-181",
    "28) P. K. Sharma, B. P. Patel, P. K Thakur, “Experimental study of flat-collared hemispherical shells under shock loading” Journal of the Brazilian Society of Mechanical Sciences and Engineering. DOI:10.1007/s40430-024-04862-6 (Accepted, March 2024)",
    "29) Pogula Nikhil Chakravarthy and Pankaj Kumar Sharma, “Terramechanics Models for Tracked Vehicle Terrain Interaction Analysis A Review” Defence Science Journal (Accepted, March 2024)",
    "30) Yadav, K., Ovhal, M. M., Parmar, S., Gaikwad, N., Datar, S., Kang, J.-W., & Patro, T. U. (2024). Nico2O4 nanoneedle-coated 3D reticulated vitreous porous carbon foam for high-performance all-solid-state supercapacitors. ACS Applied Nano Materials, 7(2), 2312–2324",
    "31) Kumar, S., Rath, S. K., Kushwaha, A., Deshpande, S. K., Patro, T. U., & Harikrishnan, G. (2024). Thermal evolution of a polymer–nanoparticle binary mixture. Physical Chemistry Chemical Physics, 26(4), 3036–3043. doi:10.1039/d3cp04780f doi:10.1039/d3cp04780f",
    "32) D. Upreti, A. Rajendran, N. Lenka, R. Srivastava, R. Sen Gupta, B. Maiti, S. Bose, T. U. Patro, Designing a robust biocompatible porous polymeric membrane using Laponite and graphene oxide for versatile and selective adsorption of water contaminants, Chem. Eng. J., 464 , (2023), 1329-1344.",
    "33) R. Wagmare, R. Harshe, J. Pednekar, T. U. Patro, M. Joshi, Effect of nanosilica on low-velocity impact and compression after impact properties of continuous carbon fiber-reinforced epoxy composites manufactured by 3D printing, Polym. Compos., (2023) Accepted (https://doi.org/10.1002/pc.27666)",
    "34) C. Dash, R. Das, D. K. Sahu, D. Upreti, T. U. Patro, D. K. Bisoyi, Investigation of Dielectric and Mechanical Properties of Pretreated Natural Sunn Hemp Fiber-Reinforced Composite in Correlation with Macromolecular Structure of the Fiber, Biomacromolecules, 24 (2023) 1329–1344",
    "35) J.K. Bansiwal, A.S. Singh, T.U. Patro, D. S. Bag, Synthesis and thermal analysis of silicon-containing bis-phthalonitrile resin with enhanced solubility. J. Therm. Anal. Calorim. 148 (2023) 383–392",
    "36) J. K. Banshiwal, T. U. Patro, A. S. Singh, D. S. Bag, Thermal Studies of High Temperature Resistant Phosphorylated Phthalonitrile Resins, NanoWorld J 9(S1): S203-S207 (10.17756/nwj.2023-s1-041)",
    "37) R. Bagal, M. Bahir, N. Lenka, T. U. Patro, Polymer derived porous carbon foam and its application in bone tissue engineering: a review, Int. J. Polym. Mater. Polym. Biomater., 72 (2022) 909-924",
    "38) P. Vislavath, S. Billa, J. Bahadur, K. Sudarshan, T. U. Patro, S. K. Rath, D. Ratna, Heterogeneous Coordination Environment and Unusual Self-Assembly of Ionic Aggregates in a Model Ionomeric Elastomer: Effect of Curative Systems, Macromolecules, 55, (2022), 6739-6749.",
    "39) N. Sakhadeo, T. U. Patro, Exploring the Multifunctional Applications of Surface-Coated Polymeric Foams-A Review, Ind. Eng. Chem. Res., 61, (2022), 5366–5387.",
    "40) K. Yadav, S. S. Raut, T. U. Patro, A. C. Abhyankar, P. S. Kulkarni, Annealing temperature-and morphology-controlled development of nickel cobaltite nanoneedles for photocatalytic degradation of nitroaromatics, Ind. Eng. Chem. Res., 61, (2022), 4273-4285.",
    "41) S. K. Rath, S. Praveen, J.G. Chavan, S. Billa, T. U. Patro, M. Patri, Dual approach of bimodality and nano-reinforcement towards toughened PDMS based foul release coatings. J. Coat Technol. Res. 18, 871–885 (2021)",
    "42) R. Bagal, D. K. Chouhan, B. N. Sahoo, R. Chaudhari, C. J. Bhongale, T. U. Patro, Superhydrophobic silicone-coating on carbon foam for efficient oil adsorption, Mater. Lett., 311, (2021), 131525",
    "43) K. Yadav, R. Bagal, S. Parmar, T. U. Patro, A. C. Abhyankar, In Situ Coating of Needle-like NiCo2O4 Magnetic Nanoparticles on Lightweight Reticulated Vitreous Carbon Foam toward Achieving Improved Electromagnetic Wave Absorption, Ind. Eng. Chem. Res., 60, (2021), 14225–14238.",
    "44) G. S. Kumar, T. U. Patro, Tuning the piezoresistive strain‐sensing behavior of poly (vinylidene fluoride)–CNT composites: The role of polymer–CNT interface and composite processing technique, J. Appl. Polym. Sci., 139, (2021), 51516",
    "45) S. Praveen, J. Bahadur, R. Yadav, S. Billa, T. U. Patro, S. K. Rath, D. Ratna, M. Patri, Tunable viscoelastic and vibration damping properties of a segmented polyurethane synergistically reinforced with carbon black and anisotropic additives, Appl. Acoustics, 170 (2020) 107535",
    "46) G. K. Arbade, J. Srivastava, V. Tripathi, N. Lenka, T. U. Patro, Enhancement of hydrophilicity, biocompatibility and biodegradability of poly (ε-caprolactone) electrospun nanofiber scaffolds using poly (ethylene glycol) and poly (L-lactide-co-ε-caprolactone-co-glycolide) as additives for soft tissue engineering, J. Biomater. Sci., 31, (2020),1648-1670.",
    "47) G. K. Arbade, V. Dongardive, S. K. Rath, V. Tripathi, T. U. Patro, Effect of poly (ethylene glycol) on drug delivery, antibacterial, biocompatible, physico-chemical and thermo-mechanical properties of PCL-chloramphenicol electrospun nanofiber scaffolds, Int. J. Polym. Mater. Polym. Biomater., 71, (2020), 208-219.",
    "48) G. K. Arbade, V. Kumar, V. Tripathi, A. Menon, S. Bose, T. U. Patro, Emblica officinalis loaded poly (ε-caprolactone) electrospun nanofiber scaffold as potential antibacterial and anticancer deployable patch, New J Chem, 43, 7427-7440 (2019)",
    "49) Bearings in aerospace, application, distress, and life: A Review, Journal of Failure Analysis and Prevention (ASM) 23 (3), 915-947",
    "50) The emergence of reflective thermal barrier coatings, Critical Reviews in Solid State and Materials Sciences, pp 1-25, https://doi.org/10.1080/10408436.2023.2245599",
    "51) Modeling of Degradation in Gas Turbine Engine by Modified Off-Design Simulation. Defence Science Journal, 72 (2), 2022, 135-145",
    "52) Effectiveness of lanthanum zirconate and Yttria stabilised zirconia freestanding APS thermal barrier coatings against natural CMAS attack at high temperatures, Materials at High Temperatures 37 (6), 2020, 416-424",
    "53) Synthesis and application of nano-structured bi-layer YSZ-LZ thermal barrier coating, Defence Sci. J 69 (2), 2019,185-19",
    "54) Manna, S. and Nadge, P.,2021, “CFD Analysis of a Prismatic Liquid Cooled Battery Pack to Optimize and Evaluate Pack Performance Under Variable Operating and Coolant Conditions”, SAE Technical Paper 2021-28-0116",
    "55) “Computational Fluid Dynamic Analysis of Thermal Management for Li-Ion Battery Pack Using NTGK Model”, 10th International and 50th (Golden Jubilee) National Conference on Fluid Mechanics and Fluid Power (FMFP 2023), December 20-22, 2023, IIT Jodhpur, India"
]

def parse_pub(raw):
    # Remove numbering like "1) "
    cleaned = re.sub(r'^\d+\)\s*', '', raw).strip(' *')

    # Try to extract year (4 consecutive digits between 2000 and 2026)
    year_match = re.search(r'\b(20\d{2})\b', cleaned)
    year = year_match.group(1) if year_match else None

    # Heuristic for title/authors/journal
    parts = cleaned.split(',')

    title = parts[0].strip()
    quote_match = re.search(r'[“"]([^”"]+)[”"]', cleaned)
    if quote_match:
        title = quote_match.group(1).strip()

    authors = "SDTM Research"
    journal = "Research Publication"

    if len(parts) > 2:
        potential_authors = []
        for p in parts[1:]:
            p = p.strip()
            if any(kw in p.lower() for kw in ["journal", "transactions", "chemistry", "physics", "science", "conference", "letters", "materials", "technology", "society", "biomacromolecules", "applied"]):
                journal = p
                break
            else:
                potential_authors.append(p)

        if potential_authors:
            authors = ", ".join(potential_authors)

    pub_date = f"{year}-01-01" if year else 'NULL'

    return {
        'title': title.replace("'", "''"),
        'authors': authors.replace("'", "''"),
        'journal': journal.replace("'", "''"),
        'pub_date': pub_date
    }

sql_lines = []
for pub in publications_raw:
    p = parse_pub(pub)
    date_val = f"'{p['pub_date']}'" if p['pub_date'] != 'NULL' else 'NULL'
    sql_lines.append(f"('PUBLICATION', '{p['title']}', '{p['authors']}', {date_val}, '{p['journal']}', true, NOW(), NOW())")

output = "INSERT INTO \"Research\" (type, title, authors, \"publicationDate\", journal, \"isVisible\", \"createdAt\", \"updatedAt\") VALUES\n"
output += ",\n".join(sql_lines) + ";"

with open('d:\\School-of-Defence-Technology-and-Management\\pubs.sql', 'w', encoding='utf-8') as f:
    f.write(output)
