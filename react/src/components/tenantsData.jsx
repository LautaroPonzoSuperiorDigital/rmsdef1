import CheckMark from "../assets/img/CheckMark.svg";
import "./modals";
import React from "react";

const tenantsData = [
  {
    name: "Maria Kramer",
    listings: "46780",
    status: "Paid Feb 1, 2023",
    email: "marianie@gmail.com",
    phone: "530-521-7450",
    contract: "Mar 12, 2022 - Mar 12, 2023",
    backgroundCheck: null,
  },
  {
    name: "Hamish Mago",
    listings: "57478",
    status: "Paid Feb 1, 2023",
    email: "hamishmago@gmail.com",
    phone: "310-480-6714",
    contract: "Dec 10, 2022 - Dec 10, 2024",
    backgroundCheck: "check",
  },
  {
    name: "Alessia Beelzebub",
    listings: "47474",
    status: "Paid Feb 1, 2023",
    email: "alessiabeelzebub@gmail.com",
    phone: "818-636-0698",
    contract: "May 29, 2022 - May 29, 2023",
    backgroundCheck: null,
  },
  {
    name: "Monroe Ally",
    listings: "67926",
    status: "Paid Feb 1, 2023",
    email: "monroeally@gmail.com",
    phone: "951-385-6842",
    contract: "Mar 12, 2022 - Mar 12, 2023",
    backgroundCheck: "check",
  },
  {
    name: "Nellie Velda",
    listings: "13425",
    status: "Paid Feb 1, 2023",
    email: "nellievelda@gmail.com",
    phone: "818-730-8775",
    contract: "Sep 1, 2022 - Sep 1, 2023",
    backgroundCheck: "check",
  },
  {
    name: "Freda Katherine",
    listings: "24235",
    status: "Missed Payment Feb 1, 2023",
    email: "fredaka@gmail.com",
    phone: "951-200-4891",
    contract: "Aug 12, 2022 - Aug 12, 2024",
    backgroundCheck: "check",
  },
  {
    name: "Maryan Deitra",
    listings: "09432",
    status: "Paid Feb 1, 2023",
    email: "marymary@gmail.com",
    phone: "408-569-4897",
    contract: "Aug 10, 2022 - Aug 10, 2023",
    backgroundCheck: "check",
  },
  {
    name: "Blue Regena",
    listings: "07466",
    status: "Paid Feb 1, 2023",
    email: "blueregena@gmail.com",
    phone: "408-569-4632",
    contract: "Jul 30, 2022 - Jul 30, 2023",
    backgroundCheck: "check",
  },
  {
    name: "Averie Elise",
    listings: "32441",
    status: "Paid Feb 1, 2023",
    email: "averieelise@gmail.com",
    phone: "530-521-4598",
    contract: "Oct 1, 2022 - Oct 1, 2023",
    backgroundCheck: "check",
  },
  {
    name: "Evonne Jodene",
    listings: "35347",
    status: "Paid Feb 1, 2023",
    email: "evonnejodene@gmail.com",
    phone: "408-569-4632",
    contract: "Jul 30, 2022 - Jul 30, 2023",
    backgroundCheck: (
      <img className="checkMark" src={CheckMark} alt="CheckMark" />
    ),
  },
];

export default tenantsData;
