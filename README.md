# Customers Line-Up
Customers Line-Up is an easy-to-use application whose main goal was to avoid gatherings of people waiting in queues outside supermarket during the Covid-19 epidemic.

All the phases of the software development were followed, starting from the requirement analysis, going through the design phase, until the final actual implementation of the mobile application, documenting precisely every step.

<p align="center">
  <img width="50%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/ATD/Images/MockupLogo/LogoEnorme.png">
</p>

# Documents
We wrote three different documents in order to keep track of all the important information and modifications that were needed during the software developement:
 - RASD (Requirement Analysis and Specification Document)
 - DD (Design Document)
 - ITD (Implementation and Testing Document)


# Frameworks & Tools 
The implementation phase was performed using:
 - MySQL for the Database;
 - Java with JAX-RS for building the Restful Server APIs; JPA was exploited for managing the connection with the Database;
 - React-Native (JS) for building the Mobile Application.
 
The testing phase of the Application Server was performed using Junit.

<p align="left">
  <img width="24%" hspace="4%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/DD/Images/MockupLogo/mockLogin.PNG">
  <img width="24%" hspace="4%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/DD/Images/MockupLogo/mockRegistration.PNG">
  <img width="24%" hspace="4%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/DD/Images/MockupLogo/mockLineUpNew.PNG">
</p> 

<p align="left">
  <img width="24%" hspace="4%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/DD/Images/MockupLogo/mockLineUpSent.PNG">
  <img width="24%" hspace="4%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/DD/Images/MockupLogo/mockBookNew.PNG">
  <img width="24%" hspace="4%" src="https://github.com/LudovicoRighi/RighiGherardi/blob/main/DD/Images/MockupLogo/mockQRCode.PNG">
</p>

# External APIs
The Mobile Application uses the Google Map's APIs, in particular:
  - GOOGLE MAPS GEOLOCATION API: to find the exact locations of the Customers.
  - GOOGLE MAPS DISTANCE MATRIX API: to get informations about the recommended route and the duration of the trip (driving, public transportation, walking or cycling) while considering the current traffic situation.

# Group Members
This project was developed for the "Software Engineering II" course at Politecnico di Milano by me (Ludovico Righi) and my colleague Enrico Gherardi.
The final evaluation by our professor was 30/30.
