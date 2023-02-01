import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";


const resource = {
    // we init with resources
    resources: {
        en: {
            translations: {
                "Designing Tzahar": "Designing Tzahar",
                "headline": "The Technion & Cornell invite you to participate in the design of a new building and community center",
                "Sign up to participate": "Sign up to participate",
                "Return as participant": "Return as participant",
                "Who we are?": "Who we are?",
                "Project Overview": "Project Overview",
                "Interested? Sign up here": "Interested? Sign up here",
                "project_description": `Residents, employees, and business owners located near the ZHR Industrial Park are all invited to participate in a first-of-its-kind project, where we will design a new Innovation, Culture and Education Center for the community, together. This participatory design project provides local stakeholders a role and opportunity to shape their buildings, community, and future together. 

                Over the course of an 8-week iterative process, participants will engage in the co-design of a building via town hall meetings, workshops, and asynchronous sketching sessions. `,
                
                "benefit_0":"Democratic participation between residents, local employees and business owners, and developers will be combined with architectural and development design processes, leveraging artificial intelligence, to create a community hub.",
                "benefit_1": "Create the community you want to see by contributing your voice to our shared future",
                "benefit_2": "Influence the design of public spaces you will enjoy, use, or rely on",
                "benefit_3": "Enjoy a unique participatory design experience",
                "benefit_4": "Be the first to use a novel AI design technology",
                "benefit_5": "Positively influence your community and the public space around you",
                "benefit_6": "Support academic research and help improve existing planning methods in Israel and around the world.",
                "building_description":"The building will be 3,000 square meters and include a variety of community, commercial and cultural uses. The plot is 5,000 square meters. The structure must be built at a distance of 5 meters from the plot boundaries. Building height is limited to 14 meters due to the adjacent airport.  ",
                
                team: [

                    {
                        name: 'Aaron Sprecher',
                        affiliation: 'Technion, Haifa, Israel',
                        description: 'I am a Professor of Architecture at Technion and director of the design lab MTRL. I am the principal investigator of the project.'
                    },
                    {
                        name: 'Qian Yang',
                        affiliation: 'Cornell University, New York, USA',
                        description: 'I am a professor in computer science and design research. I am the principal investigator of the project.'
                    },
                    {
                        name: 'Jonathan Dortheimer',
                        affiliation: 'Technion, Haifa, Israel',
                        description: 'I am an architect and researcher at Technion. I developed the technology for the project.'
                    },
                    {
                        name: 'Stephen Yang',
                        affiliation: 'Cornell University, New York, USA',
                        description: 'I am a researcher at Cornell that devises the participation activities of the design process.'
                    },
                    {
                        name: 'Dan Nissimyan',
                        affiliation: 'Valiant LTD',
                        description: 'I am a social entrepreneur piloting innovative participatory systems and researching education at Harvard University.'
                    },
                ],
                faq:
                    [
                        {
                            question: "What’s the Project's goal?",
                            answer: `We want to build a model of planning and design of public spaces not just for communities, but by them: public spaces informed by collective experience, knowledge, and wisdom of the people who use them. Community members, rather than being sidelined, will be encouraged to bring their knowledge to bear and contribute to the methodologies and design of their environments. The project will examine how we can improve this approach in the hope that it will serve as a precedent for community participation in large-scale urban regeneration projects across the country over the coming decades. 

                            This is a new way of thinking in community development projects. It provides an alternative to the developer-driven model employed worldwide. In the common model, decisions about public spaces are made by developers who do not and will not utilize those spaces, and community members have little say. 
                            
                            Above all, the aim of the project is to design and build a structure that will be a center of innovation, culture and education and will serve the community according to its needs and goals. `
                        },
                        {
                            question: "How will I participate in the process?",
                            answer: `If you have an interest in the area — whether you work here, live here, your children attend school here, or have another connection to our community — you are warmly invited to participate. You will help inform a democratic design processes in Israel and beyond; the work we do today will be a community-building model that can be leveraged worldwide.


                            The opportunities to participate include:

                            • Community kick-off meeting

                            • Concept Sketch Design workshops with architecture students from the Technion where we will create preliminary sketches.

                            • Asynchronous conversations with an innovative AI bot that understands and analyzes the ideas of all participants and generates guidelines for architects.

                            • Participate in voting on the design concept according to sketches. These sketches will be presented to you and provide feedback on improvements.
                            
                            The extent of your participation is entirely up to you, and nothing is mandatory. `
                        },
                        {
                            question: "Our guiding values",
                            answer: `This project is an preliminary step in manifesting new kind of shared community center. One where our collective values inform the design of our collective spaces. Values like lifelong learning, community engagement, transparency, and accessibility to all. 
 
Churchill remarked, “We shape our buildings; thereafter they shape us,” and we agree. We think design can be improved through community input and deliberation. We draw upon the knowledge commons and enrich it by making our work visible and accessible. 

The Center will be a free resource, both in physical space and programming, for people of all ages who want to explore and enrich their knowledge, and for those who want to learn together.

That's us. Coffeeshop Alchemy, the developer. And were thrilled you’re considering joining us. 

Above all, we value: 

    • ACCESS & OPPERTUNITY 
Removing barriers, building awareness, and curating opportunities.
    • POTENTIALITY & DIVERSITY 
Everyone has potential, and intelligence is not innate. By developing potential, we are better prepared to capture opportunities as they materialize. Diversity, of perspectives and thought further improve creativity and outcomes.
    • AGENCY & ENGAGEMENT 
We need to act to create change. 
    • EXPERIMENTATION & ITERATION 
Nothing works right the first time. Apply the scientific method and we keep at it!
    • PERSONAL RESPONSIBILITY & LONG-TERM COMMITMENTS 
Having skin in the game keeps you in the game. And we play the long game – we work with 20 years plans. This is only the beginning. `


                        },

                    ],

                "Sign in": "Sign in",
                "Login": "Login",
                "Input the email that you signed up with to log in": "Input the email that you signed up with to log in",
                "Your email": "Your email",
                "Email": "Email",
                "Loading...": "Loading...",
                'Hazor Haglilit': 'Hazor Haglilit',
                'Rosh Pina': 'Rosh Pina',
                'Tuba Zangriyya': 'Tuba Zangriyya',
                'Zefad': 'Zefad',
                'Other locallity in the Galil': 'Other locallity in the Galil',
                'I do not live in the area': 'I do not live in the area',
                'I live in the area': 'I live in the area',
                'I work in the area': 'I work in the area',
                'I am an architect / designer': 'I am an architect/designer',
                'Other': 'Other',
                'Step': 'Step',
                'Which locality are you associated with?': 'Which locality are you associated with?',
                'What kind of connection do you have to the project?': 'What kind of connection do you have to the project?',
                'When were you born?': 'What year were you born?',
                'Given name': 'Given name',
                'Family name': 'Family name',
                'Registrating user': 'Registrating user',
                'Sign up': 'Sign up',
                'do not hesitate': 'Please do not hesitate to contact us with any questions:',
                'Any question?': 'Any question?',

                "Informed consent to participate in the study": "Informed consent to participate in the study",

                "I agree to participate": "I agree to participate",
                'consent1': "in the research as detailed on this page",

                "I agree that I will not receive compensation": "I agree that I will not receive compensation",
                'consent2': "I consent to the researcher, to make use of the advice or ideas that I will produce in the research without any obligation of consideration for me or to anyone on my behalf.",

                "I agree that the design might not be realized": "I agree that the design might not be realized",
                'consent3': "No commitment has been given for the realization of any design or any result of the research.",

                "I waive copyright claims": "I waive copyright claims",
                'consent4': "I allow the research team to use my advice and ideas as well as in their application in the architectural design that can be established and / or assimilated and / or contain any of them.",

                "I understand and participate of my own free will": "I understand and participate of my own free will",
                'consent5': "I declare that I have been provided with detailed information about the study. I hereby declare that I gave my above consent of my own free will and that I understood all of the above",

                "Gender": "Gender",
                "Male": "Male",
                "Female": "Female",
                "Prefer not to disclose": "Prefer not to disclose",

                "Agree": "Agree",



                'Create Concept Sketch': 'Create Concept Sketch',
                'Make a napkin sketch that conveys the main design ideas': 'Make a napkin sketch that conveys the main design ideas',
                'Give Feedback': 'Give Feedback',
                'Select the design you like and tell us what you think': 'Select the design you like and tell us what you think',
                'Open Discussion Meeting': 'Open Discussion Meeting',
                'RSVP and have your voices heard at the the Open Discussion Meeting': 'RSVP and have your voices heard at the Open Discussion Meeting',
                "More Details": "More Details",

                "Z.H.R industrial Zone management company (conference room)": "Z.H.R industrial Zone management company (conference room)",
                "Z.H.R Industrial Zone, Rosh Pinna": "Z.H.R Industrial Zone, Rosh Pinna",

                "meeting_summary": `Join us for an open-forum meeting where local residents, workers, and businesses come together to envision the blueprint of the project! The floor is open to everyone; everyone is more than welcome at the table. It is our upmost priority to foster a safe and inclusive space where people can recognize and amplify the voices of one another.
                The meeting agenda will be crowdsourced. Before the meeting, each one of you can suggest and add discussion points to our meeting agenda. We will then go through these discussion points to make sure all the points at issue are brought to light. You can access and suggest the meeting agenda here.
                During the meeting, all the attendees will have ample opportunities to individually voice your values, needs, aspirations, and concerns to the rest of the community. You will also have the opportunity to comment on other people’s ideas.
                After the meeting, we will develop the meeting notes into a design brief that lists the design requirements highlighted during the meeting. The design brief will serve as the guiding principles and values as we move forward with the design process.
                The meeting is currently scheduled to take place on May 15 (Sun), 6 PM at [location]. Please RSVP below so we can keep you in the loop for the updates.


                Upon your confirmation, you will receive and email calendar invite, that will be automatically added to your calendar.
                Your confirmation is important so that we can prepare better for the meeting.`,


                "CoDe-meeting_summary": `Join us for a co-design workshop where local residents, workers, and businesses come together to visualize the design of the project! The floor is open to everyone; everyone is more than welcome at the table. It is our upmost priority to foster a safe and inclusive space where people can recognize and amplify the voices of one another.
                In the meeting you will have the opportunity to express your ideas visually collaboratively and with the support of professional architects from Technion faculty of Architecture.

We will start the meeting with an introduction and we will introduce some tricks that architects use to make nice sketches. Then we will work with the architects to visualize your ideas. We will discuss the sketches and finally, we will make new and imporved sketches.
               
                Please RSVP below so we can keep you in the loop for the updates.


                Upon your confirmation, you will receive and email calendar invite, that will be automatically added to your calendar.
                Your confirmation is important so that we can prepare better for the meeting.`,
                "token_message": "We just sent you an email with a token. Copy the token from the email and provide it to the following input. Notice that the email might be in your spam folder.",
                "privacy_notice": 'Your input, information, and personal details will not be shared with any third-party under any circumstances. Participation is voluntary, you may cease your participation at any point.',

                'review_description':'Look at the following designs and mark which designs you want to consider for further developement. In the next step you will be able to choose the best from the designs you marked for consideration.',

                'select_description':'Select the best or most promising design. By expressing your needs, values, and preferences, your input helps us collectively move forward in the decision-making process.',
                
                'final_meeting_summary':`We are nearing the end of the project and would like to invite you to a summary meeting next Sunday (July 31) at 17:00 at ZHR management. 
  
                As you may have noticed, the community design process converged democratically on a specific design. However, we have many more designs, as we have an online architectural competition as an experiment control. Over 50 architects from around the world offer competing designs for a monetary prize. At the meeting we will reveal the detailed design from the participatory process and the designs from the architecture competition.     
                
                We would like to hear what you think about your participation in the project. 
                As a participant in the collaborative architectural design process, you had the chance to influence the entire project process. This included the initial design requirements, producing conceptual sketches, and navigate the final design development. Architectural and urban planning processes usually do not involve the community making decisions. Since you have participated in online, or in-person meetings, or both, we would like to hear your thoughts on community participation. 
                  
                We would like to know what you think about the in-person and online partificaption modalities. 
                In this experiment we used advanced information technologies and conventional methods (discussion meeting, design meeting, and distribution of flyers) for community participation. We will hold a discussion and learn how the types of work you want to influence your involvement in the project and effectiveness. 
                  
                We would like to discuss how personal and community values are reflected in the designs.
                In our research, we assumed that a participatory design approach would be able to adapt the design to the community values and the environment better. In the meeting we would like to discuss the subject and form an opinion on it.    
                  
                Thank you for your contribution to the community and research! 
                `,
                "overview": [
                    {
                        'label': 'Requirements',
                        'description': "In this step, we gather information from the community in order to translate it into design requirements. It is a critical step in the creation of the project that defines its functionality, design, and social values. Information will be collected through both a physical community meeting and online chat."
                    },
                    {
                        label: 'Concept Design',
                        description: `Using sketches developed by architects and community feedback, this step aims to generate a conceptual design. A concept design will define the main design direction of the project based on the preferences and cultural values of the community while meeting the project's requirements. Architects will prepare conceptual sketches at the beginning of the process, and the community will then choose the best sketches and provide a critique.
                        `
                    },
                    {
                        label: 'Program sketches',
                        description: `The goal of this step is to produce the concept design using plan sketches, elevations, and sections to be prepared by architects based on community feedback. Plans describe the relationship between the spaces and their locations, while sections describe the height of the spaces and their facades and give a sense of the appearance of the building. Initially, architects will prepare sketches of plans, facades, and sections, and later the community will review and select the best sketches.`
                    },
                    {
                        label: '3D model',
                        description: 'This phase involves integrating conceptual sketches, plans, sections, and facades using digital three-dimensional models created by architects and incorporating community feedback. Three-dimensional models require the integration of all two-dimensional sketches and will help reveal the relationships between spaces and their connections. In the beginning, architects will prepare models, and then the community will select the best models after reviewing and criticizing them.'
                    },
                    {
                        label: 'Detailed plan',
                        description: 'During this phase, computerized plans, sections, and facades prepared by architects will be used to give an accurate representation of the interior spaces, followed by community feedback to determine the best plan. Scale and accuracy can be ensured through computerized drawing. Initially, architects will prepare plans, and then the community will select the best ones with references and reviews.'
                    },
                    {
                        label: 'Improving plans',
                        description: 'This step involves using pen sketches to optimize the design and selecting the best sketches through community feedback. By sketching manually, we can break through the design fixation to find creative solutions to existing problems. At the beginning of the stage, architects will prepare sketches and later, the community will select the best sketches with reference and review.'
                    },
                    {
                        label: '3D integration',
                        description: 'The purpose of this step is to make a final integration of sketches and plans and produce a three-dimensional model and determine the chosen design. At the beginning of the stage, architects will prepare the models and later, the community will choose the preferred model.'
                    }
                ]
            }
        },
        he: {
            translations: {
                "Designing Tzahar": 'מתכננים בצח"ר',
                "headline": `הטכניון ואוניברסיטת קורנל מזמינים אתכם  להשתתף בעיצוב אדריכלי של "מרכז חדשנות, תרבות וחינוך" חדש בפארק התעשיה צח"ר`,
                "Sign up to participate": "הרשמה",
                "Return as participant": "התחברות לרשומים",
                "Who we are?": "צוות הפרויקט",
                "Project Overview": "אודות הפרויקט",
                "Interested? Sign up here": "מעוניינים? הירשמו כאן",
                "project_description": `אנו מזמינים אתכם, תושבי, עובדי ובעלי העסקים המקומיים להשתתף בפרויקט ראשון מסוגו שבו תוכלו להשפיע בתהליך "שיתוף ציבור" אמיתי בתכנון ועיצוב האדריכלי של  מבנה מרכז חדשנות, תרבות וחינוך ZHR. 
                הפרויקט מבוסס על תוכנית בת 8 שבועות בה תוכלו לבטא את הצרכים, השאיפות והערכים שלכם באמצעות מפגשים פיזיים ו/או שימוש במערכת שיתוף ציבור מקוונת.`,
                "building_description": 'הבניין יהיה בגודל של 3000 מ"ר ויכלול מגוון שימושים קהילתיים, מסחרים ותרבותיים. גודל המגרש הוא 5000 מ"ר וניתן לבנות במרחק של 5 מטר מגבולות המגרש. בשל הקרבה לשדה התעופה יש מגבלת גובה של 14 מטר.',
                'About the building': 'אודות המבנה',

                "benefit_0":"נעצב מרכז קהילתי באמצעות תהליך עיצוב השתתפותי ודמוקרטי הכולל תושבים,עובדים, בעלי עסקים ויזם הפרויקט תוך שימוש בבינה מלאכותית וטכנולוגיות מחשב מתקדמות.",
                "benefit_1": "להינות מחווית עיצוב משתף קהילתית ייחודית",
                "benefit_2": "להיות הראשונים להשתמש בטכנולוגיית בינה מלאכותית חדשנית",
                "benefit_3": "אפשרות להשפיע על קהילה והמרחב הבנוי הקרוב",
                "benefit_4": "לסייע למחקר מדעי ולקדם את שיטת התכנון הקיים בארץ ובעולם",
                "benefit_5": "ניתן לבחור באילו פעילויות להשתתף או בכלל לא להשתתף",
                "benefit_6": "המחקר על פי אמות המידה האקדמיות המקובלים",
                team: [

                    {
                        name: 'אהרון שפרכר',
                        affiliation: 'טכניון, חיפה, ישראל',
                        description: 'אני פרופסור לארכיטקטורה בטכניון ומנהל מעבדת העיצוב MTRL. אני החוקר הראשי של הפרויקט'
                    },
                    {
                        name: "צ'יאן יאנג",
                        affiliation: 'אוניברסיטת קורנל, ניו יורק, ארה"ב',
                        description: 'אני פרופסור למדעי המחשב וחוקרת עיצוב. אני החוקרת הראשית של הפרויקט'
                    },
                    {
                        name: 'יונתן דורטהיימר',
                        affiliation: 'טכניון, חיפה, ישראל',
                        description: "אני אדריכל וחוקר בטכניון. אני מנהל את הפרויקט הזה."
                    },
                    {
                        name: 'סטיבן יאנג',
                        affiliation: 'אוניברסיטת קורנל, ניו יורק, ארה"ב',
                        description: 'אני חוקר בקורנל שמתכנן את פעילויות ההשתתפות בתהליך העיצוב'
                    },
                    {
                        name: 'דן ניסמיאן',
                        affiliation: 'ואליאנט השקעות בע"מ',
                        description: 'אני יזם חברתי הבוחן טכנולוגיות שיתוף חדשניות וחוקר חינוך באוניברסיטת הרווארד.'
                    }
                ],
                faq:
                    [
                        {
                            question: "מהי מטרת הפרויקט?",
                            answer: 'אנו מציעים גישה חדשה לתכנון ועיצוב המרחב הציבורי מתוך תפיסה שהקהילה, שגרה ועובדת במקום שנים רבות, בעלת ידע קריטי לתכנון וצריכה להשפיע ולהביע את דעתה. בפרויקט נבחן כיצד אנו יכולים לשפר ולייעל גישה זו מתוך תקווה כי היא תשמש תקדים להשתתפות קהילתית בפרויקטים רחבי היקף של התחדשות עירונית ברחבי הארץ במהלך העשורים הקרובים. כמובן שמעבר לכל, מטרת הפרויקט היא לתכנן ולהקים מבנה שיהיה מרכז של חדשנות, תרבות וחינוך וישמש את הקהילה בהתאם לצרכים והרצונות שלה (עוד על כך בערכי הליבה של הפרויקט).'
                        },
                        {
                            question: 'איך תשתתפו בתהליך?',
                            answer: "יהיו לכם מספר הזדמנויות ואופנים להשתתף בהתפתחות של עיצוב בניין, בין השאר: פגישת קהילה פיזית, סדנת עיצוב עם אדריכלים, ושימוש בתוכנת העיצוב המקוונת שלנו. המפגשים יתקיימו במאי 2022 באזור התעשייה (תאריכים ומיקומים יפורסמו לנרשמים). פיתוח הסקיצות של המבנה יתקיימו מיוני עד יולי 2022. תהליך העיצוב הקהילתי יגיע לשיאו בסקיצת העיצוב הסופית. אנו מעודדים השתתפות בכל הפעילויות המפורטות, אך אתם יכול להשתתף בחלק מהן, לבחירתכם."
                        },
                        {
                            question: "ערכי הליבה של הפרויקט",
                            answer: `אנו מאמינים ששותפות וגיוון הם המפתח לחדשנות ויצירתיות. אנו מעוניינים לטפח מרחב בטוח שבו קהילה תרגיש בנוח לבטא את הערכים המגוונים שלה. אנו מאמינים שכולם חשובים ולכן, על מנת לשפר את המציאות, אנו פועלים באופן אקטיבי כדי ליצור דבר בעל משמעות. אנו מבקשים לעודד קהילות לומדות להשתתף בתהליך העיצוב והתכנון ואנחנו מאמינים שאפשר לעשות דברים גדולים עם אנשים טובים.
                            מרכז חדשנות, תרבות וחינוך של ZHR הוא משאב חופשי ללומדים ומחנכים מקומיים לעצב ולשפר את חוויות הלמידה. המרכז שואף לדמוקרטיזציה של גישה למידע והזדמנויות, לקדם גישות למידה מקומיות ולטפח קשרים ארוכי טווח בין קהילות באמצעות שיטות השתתפותיות וחווייתיות. המרכז יספק ללומדים ולקהילות שלהם מרחבי מפגש ויצירה, כמו כן, יציע תכנים שיסייעו בשיפור תוצאות תהליך הלמידה - מחינוך לגיל הרך ועד להתפתחות המקצועית לאחר השכלה גבוהה.
                            
                            מרכז החדשנות, התרבות והחינוך ZHR יהיה מבוסס על עקרונות הבאים:
                             גישה והזדמנויות - הסרת מחסומים ומוכנות כאשר הזדמנויות מופיעות.
                             פוטנציאל - פיתוח הפוטנציאל של הפרט.
                             סוכנות ומעורבות - יש לפעול על מנת לחולל שינוי
                             גיוון - של קהילות ומחשבה לשיפור היצירתיות
                             ניסוי וחזרה - אם משהו לא עובד כמו שצריך בפעם הראשונה - יש להמשיך ולנסות!
                             אחריות אישית ומחויבות לטווח ארוך - השקעה היום תניב פירות בעתיד.`


                        },

                    ],


                    "Original design":"העיצוב המקורי",
                    "New design":"העיצוב החדש",
                    "The following are new designs for your review (click to enlarge)":"להלן העיצוב החדש (ניתן ללחוץ להגדלה)",
                    "The new design is based on this one":"העיצוב החדש מבוסס על העיצוב הזה",

                // "Enjoy a unique participatory design experience": "תהנו מחווית עיצוב משתף קהילתית ייחודית",
                // "Be the first to use a novel AI design technology": "היו הראשונים להשתמש בטכנולוגיית בינה מלאכותית חדשנית",
                // "Positively affect your community": "השפיעו לטובה על קהילתכם והמרחב הבנוי",
                // "Support science and advance the knowledge": "סייעו למחקר מדעי וקדמו את הידע האנושי",
                // "It`s free to participate": "ההשתתפות ללא עלות",
                "You may change your mind at any time": "אתם יכולים לבחור באילו פעילויות להשתתף או בכלל לא להשתתף",
                "World-class academic research privacy standards": "המחקר על פי אמות המידה האקדמיות המקובלים",
                "Frequently Asked Questions": "שאלות נפוצות",
                "Your benefits by joining the project": "למה לי לקחת חלק בפרויקט?",
                "A participatory design project by world-class research universities": "פרויקט עיצוב משתף של אוניברסיטאות מחקר מובילות",
                "Continue": "המשך",

                "Join now": "הצטרפו עכשיו",
                "Registration": "הרשמה",
                "Your information will be kept private.": "המידע שלכם ישאר פרטי.",
                "This is a time-limited project that will start soon and will not be available later.": "תקופת ההרשמה לפרויקט מוגבלת בזמן ובקרוב היא תיסגר.",
                "Sign in": "התחברות",
                "Login": "כניסה",
                "Input the email that you signed up with to log in": "הזינו את האימייל שאיתו נרשמתם כדי להיכנס",
                "Your email": "האימייל שלכם",
                "Email": "אימייל",
                "Loading...": "טוען...",
                'Hazor Haglilit': 'חצור הגלילית',
                'Rosh Pina': 'ראש פינה',
                'Tuba Zangriyya': 'טובא-זנגרייה',
                'Zefad': 'צפת',
                'Other locallity in the Galil': 'יישוב אחר בגליל',
                'I do not live in the area': 'אני לא גר באזור',
                'I live in the area': 'אני גר באזור',
                'I work in the area': 'אני עובד באזור',
                'I am an architect / designer': 'אני אדריכל / מעצב',
                'Other': 'אחר',
                'Step': 'שלב',
                'Which locality are you associated with?': 'לאיזה יישוב אתם קשורים?',
                'What kind of connection do you have to the project?': 'איזה סוג של קשר יש לכם לאזור?',
                'When were you born?': 'שנת לידה',
                'Given name': 'שם פרטי',
                'Family name': 'שם משפחה',
                'Registrating user': 'רושם משתמש',
                'Sign up': 'הרשמה',
                'do not hesitate': 'אל תהסס לפנות אלינו בכל שאלה:',
                'Any question?': 'יש לכם שאלה?',

                "Informed consent to participate in the study": "לפני שממשיכים, אנו זקוקים להסכמתכם להשתתף במחקר",

                "I agree to participate": "אני מסכימ/ה להשתתף",
                'consent1': "במחקר כמפורט בדף זה",

                "I agree that I will not receive compensation": "אני מסכימ/ה שלא אקבל תגמול או פיצוי",
                'consent2': "אני מסכים לחוקר לעשות שימוש בעצות או ברעיונות שאפיק במחקר ללא כל חובת תמורה לי או למי מטעמי",

                "I agree that the design might not be realized": "אני מבינ/ה שלא ניתנה לי התחייבות למימוש של רעיון או עיצוב כלשהו",
                'consent3': "לא ניתנה כל התחייבות למימוש של עיצוב כלשהו או תוצאה כלשהי מהמחקר או תהליך העיצוב. לא תהיה לי כל טענה בנושא.",

                "I waive copyright claims": "זכויות יוצרים",
                'consent4': "אני מוותר/ת על כל טענה לזכויות יוצרים בעיצוב האדריכלי. אם יהיה מצב שבו אחשב למחבר או משתתף ביצירה האדריכלית אני מראש מעביר את זכויות היוצרים ליזם ללא תמורה, ומעניק רישיון שימוש בינלאומי ובלתי מוגבל בזמן לאדריכל ולצוות המחקר את הפרויקט ללא תמורה.",

                "I understand and participate of my own free will": "אני מבינ/ה ומשתתפ/ת מרצוני החופשי",

                "consent5": "אני מצהיר/ה כי נמסר לי מידע מפורט על המחקר. אני מצהיר/ה בזאת שנתתי את הסכמתי מרצוני החופשי וכי הבנתי את כל האמור לעיל",

                "Gender": "מגדר",
                "Male": "זכר",
                "Female": "נקבה",
                "Prefer not to disclose": "לא מעוניין/ת לשתף",

                "Agree": "אני מסכימ/ה",


                'Create Concept Sketch': 'יצירת סקיצה קונספטואלית',
                'Make a napkin sketch that conveys the main design ideas': 'הכינו סקיצה שמעבירה את רעיונות העיצוב העיקריים',
                'Give Feedback': 'תנו משוב',
                'Select the design you like and tell us what you think': 'בחרו את העיצוב שאתם אוהבים וספרו לנו כיצד לשפר אותו',
                'Open Discussion Meeting': 'מפגש דיון פתוח',
                'RSVP and have your voices heard at the the Open Discussion Meeting': 'אשרו הגעה והשמיעו את קולכם במפגש קהילתי',

                'Discuss design requirements': 'שוחחו על דרישות העיצוב',
                "Discuss the project's design requirements using our chatbot - Zaha AI": "שוחח איתנו על דרישות התכנון והעיצוב של הפרויקט באמצעות הצ'אטבוט - זאהה AI.צה לשמוע את דעתך על העיצוב העתידי כדי שנוכל להבין במה הפרויקט צריך לעמוד",
                "More Details": "פרטים נוספים",
                "Launch": 'הפעלה',

                "Z.H.R industrial Zone management company (conference room)": `משרדי חברת הפיתוח של פארק התעשיה צח"ר (חדר ישיבות)`,
                "Z.H.R Industrial Zone, Rosh Pinna": `פארק תעשיה צח"ר, ראש פינה`,

                "meeting_summary": `אנו מזמינים אתכם להשתתף במפגש קהילתי פתוח שבו תוכלו להביע את צרכים, דרישות ושאיפות בקשר למבנה הקהילתי שיתוכנן. אנו נעבד את נושאי הדיון שיעלו בשיחה ונפיק ממנו רשימה של דרישות עיצוב.דרישות העיצוב, ישמשו לשלבי התכנון הבאים.

                אישור הגעה ישלח לכם זימון למייל, שיתווסף אוטומטית ליומן שלכם.
                אישורכם חשוב כדי שנוכל להיערך לאירוח שלכם בפגישה.`,

                "RSVP and express your ideas together with the community and architects": "אשרו הגעה והביעו את הרעיונות שלכם ויזואלית יחד עם הקהילה ואדריכלים",
                "Collaborative Design Meeting": "פגישת עיצוב משתף קהילתית",
                "CoDe-meeting_summary": `הפרויקט עובר לשלב הבא שבו מייצרים סקיצות אדריכליות למבנה העתידי. זה שלב מאוד מרגש ומסעיר שבו מתחילים לראות איך הרעיונות והחלומות קורמים עור וגידים!

                לכן אנחנו מתכבדים להזמינך לסדנת "עיצוב משתף" שבה נכין סקיצות אדריכליות - שאותם תוכל/י לשמור. 
                
                מכיוון שהבעת רעיונות כסקיצות אדריכליות דורש מיומנות וניסיון - הזמנו צוות של אדריכליות מקצועיות שיצטפו לסדנה ויעזרו, ילמדו איך לשרטט או ישרטטו ביחד איתך. אנו מאמינים שזו תהיה חוויה קהילתית מעשירה ומהנה.
                
                               
                אנא אשר/י כדי שנוכל לעדכן אותך לגבי העדכונים.


                לאחר אישורך, תתקבל הזמנה ליומן במייל, שתתווסף אוטומטית ליומן.
                האישור שלך חשוב כדי שנוכל להתכונן טוב יותר לפגישה.`,

                "Send": "שליחה",
                "Done": "סיימתי",
                "Finish Chat": "סיום שיחה",
                "Type a message": "הקלידו את הודעתכם",

                "Hello": "שלום",
                "Thank you for taking part in the project. Here you can participate by completing different tasks.": "תודה על השתתפותך בפרויקט. כאן יופיעו משימות שונות שבאמצעותן ניתן להשתתף באופן פעיל ואפקטיבי.",

                "Confirm attendance": "אישור השתתפות",
                "No active tasks": "כרגע אין משימות לביצוע",
                "We will notify you when a new task is available": "אנו נעדכן אתכם כאשר משימות חדשות יהיו זמינות",

                "token_message": "זה עתה שלחנו לך אימייל עם קוד סודי בן 6 תווים. העתק/י את הקוד מהמייל לשדה הזה כדי להמשיך. שימ/י לב, יתכן שהאימייל ימצא בתיקיית הספאם.",
                "Enter Token": "הזנת קוד להתחברות",
                "Token": 'קוד',
                "Validate": 'אימות',
                "privacy_notice": 'הפרטים האישיים שלכם לא ישותפו עם אף צד שלישי בשום מקרה. ההשתתפות היא בהתנדבות, אתם יכולים להפסיק את ההשתתפות בכל שלב.',
                "Project overview and current state": "מצב פרויקט עדכני",
                'Our community partners': 'שותפי הקהילה שלנו',
                'ZHR industrial park': 'פארק תעשיה צח"ר',
                'Hula-Valley community': 'קהילת היזמים Hula-Valley',
                'Hayozrim community': 'פורום היוצרים',
                "Choose Chatbot Language": "בחרו שפה לשיחה עם הצ'אט-בוט",
                "What language you prefer?": "מה היא השפה העדיפה עליכם?",


                "Summary": "סיכום",
                "Design requirement / Feeback": "דרישת עיצוב / משוב",
                "This is a list of high-level issues that I understood from our conversation. Please mark which issues I wrote correctly so I can send them to the designers. Incorrect items will be discarded.": "זו רשימה של נושאים מרכזיים שהבנתי מהשיחה שלנו. נא אנא שמנו אילו נושאים רשמתי נכון כדי שאוכל לשלוח אותם למעצבים. פריטים שגויים יימחקו.",
                "Incorrect": "לא נכון",
                "Correct": "נכון",

                "You missed some items": "פספסת כמה פריטים",


                'Read design brief': 'הכירו את הפרויקט',
                'Identify the designs you like': 'סמנו עיצובים טובים',
                'Choose the best design': 'בחרו את העיצוב הכי מוצלח',
                'Discuss the design': `שוחחו על העיצוב`,
                'Provide feedback': 'שלחו משוב',
                'What do I need to do?': 'מה צריך לעשות?',
                'review_description':'עיינו בעיצובים השונים וסמנו איזה מהם הייתם שוקלים לבחור להמשך פיתוח. בשלב הבא תוכלו לבחור את העיצוב המוצלח ביותר מתוף העיצובים שבחרתם',
                'Description':'תיאור',
                "I like it":"אוהב/ת את זה",
                'I do not like it':'לא אוהב/ת את זה',

                'Proceed to the next step':'עברו לשלב הבא',
                'Choose design':'בחירת עיצוב',
                'select_description':'בחרו את העיצוב הטוב או המבטיח ביותר. הבחירה שלך מבטאת את הצרכים, הערכים וההעדפות שלך, ועוזרת לנו להתקדם יחדיו בתהליך העיצוב.',

                'Design Brief':'בריף עיצוב',
                'Background':'רקע',
                'Client':'לקוח',
                'The Site':'אתר הבניין',
                'Users':'משתמשי המבנה',
                'This is the final and concluding meeting were we select the final design and reflect on the process.':
                    'זוהי פגישת הסיכוםשל הפרויקט בה נבחר את העיצוב הסופי ונדון בתהליך.',
                'Project Summary Meeting':'פגישת סיכום פרויקט',
                'final_meeting_summary':`אנו עומדים לפני סיום הפרויקט ומבקשים להזמין אותך למפגש סיכום ביום ראשון הבא (31 ביולי) בשעה 17:00 במשרדי חברת הניהול של צח"ר. בפגישה אנחנו רוצים לסכם את הפרויקט ולהודות לכולם על ההשתתפות. 

                כפי שראיתם/ן, תהליך העיצוב הקהילתי התכנס באופן דמוקרטי לעיצוב ספציפי ואנחנו עובדים על מגוון תוכניות פנים אדריכליות. במקביל לפרויקט הקהילתי, השקנו לפני חודשיים "קבוצת הביקורת" - תחרות אדריכלים מקוונת - שבה מעל 50 אדריכלים מהעולם המתמודדים על פרס כספי ומציעים עיצובים מתחרים - ללא שיתוף קהילה. במפגש נחשוף את העיצוב המפורט מהתהליך הקהילתי ואת עשרות ההצעות מתחרות האדריכלות ונדון בהם. 
                
                מטרות המפגש הן: 
                
                לשמוע מה דעתכם על השתתפותכם/ן בפרויקט: השתתפתם/ן בתהליך תכנון אדריכלי קהילתי ודמוקרטי, הייתה לכם/ן הזדמנות להחליט ולהשפיע על כל תהליך העיצוב, החל מדרישות הפרויקט, סקיצות קונספטואליות ובחירת כיווני הפיתוח של הפרויקט במהלך העיצוב. תהליכי תכנון אדריכלי ועירוניים בדרך כלל אינם מאפשרים לקהילה לקבל החלטות. לאחר שהשתתפתם בפרויקט באופן מקוון ובמפגשים, אנחנו רוצים לדעתם מה אתם/ן חושבים/ות על כך. 
                
                לדעת מה דעתכם על השתתפות פיזית, מקוונת או משולבת בתהליך העיצוב: בניסוי הזה השתמשנו בטכנולוגיות מידע מתקדמות ובשיטות קונבנציונליות (פגישת דיון, פגישת עיצוב, וחלוקת פליירים) לשיתוף קהילה. אנו רוצים לקיים דיון וללמוד כיצד סוגי ההשתתפות השונים השפיעו על המעורבות שלכם/ן בפרויקט והאפקטיביות שלהם. 
                
                לדון כיצד הערכים האישיים והקהילתיים משתקפים בעיצובים ולבחור את העיצוב המועדף: אחת מהנחות המחקר שלנו הייתה ששיתוף של קהילה יצליח להתאים את העיצוב יותר טוב לקהילה ולסביבה. בפגישה נרצה לדון כדי לגבש דעה בנושא. 
                
                לבסוף, נרצה להודות לכם/ן על ההשתתפות ותרומתכם/ן לקהילה ולמחקר!`,
                "overview": [
                    {
                        'label': 'איסוף וניתוח דרישות',
                        'description': "המטרה של השלב הזה היא איסוף מידע מהקהילה על מנת לעבד אותו לדרישות תכנון עיצוב. זה שלב קריטי שבו יוגדרו הדרישות המרכזיות של הפרויקט מבחינה פונקציונלית, עיצובית וחברתית. המידע יאסף באמצעות פגישת קהילה פיזית ובאמצעות צ'אט במערכת המקוונת."
                    },
                    {
                        label: 'עיצוב קונספט',
                        description: `המטרה של השלב הזה לבחור עיצוב קונספטואלי באמצעות סקיצות שיוכנו על ידי אדריכלים ופידבק קהילתי. העיצוב הקונספט יגדיר את הקו העיצובי המרכזי של הפרויקט המשקף את ההעדפות והערכים התרבותיים של הקהילה תוך כדי התייחסות לדרישות התכנון. בתחילת השלב, אדריכלים יכינו סקיצות קונספטואליות ובהמשך, הקהילה תבחר את הסקיצות הטובות ביותר תוך התייחסות וביקורת.`
                    },
                    {
                        label: 'סקיצות תוכניות',
                        description: 'המטרה של השלב הזה לפתח את עיצוב הקונספט באמצעות סקיצות של תוכניות, חזיתות וחתכים שיוכנו על ידי אדריכלים ופידבק קהילתי. תוכניות מביעות את הקשר בין החללים ומיקום השימושים השונים, חתכים מגדירים את היחסים בין גובה החללים וחזיתות מפרטות את המראה של המבנה. בתחילת השלב, אדריכלים יכינו סקיצות של תוכניות, חזיתות וחתכים ובהמשך, הקהילה תבחר את הסקיצות הטובות ביותר תוך התייחסות וביקורת. '
                    },
                    {
                        label: 'מודל תלת-ממדי',
                        description: 'המטרה של השלב הזה לבצע אינטגרציה של סקיצה קונספטואלית, תוכניות, חתכים וחזיתות באמצעות מודלים תלת ממדיים דיגיטליים שיוכנו על ידי אדריכלים וסינון באמצעות פידבק קהילתי. מודל תלת ממדי מחייב אינטגרציה בין כל הסקיצות הדו ממדיות ויאפשר הבנה עמוקה יותר של החללים והקשר ביניהם. בתחילת השלב, אדריכלים יכינו מודלים ובהמשך, הקהילה תבחר את המודלים הטובים ביותר תוך התייחסות וביקורת. '
                    },
                    {
                        label: 'פירוט תוכניות',
                        description: 'המטרה של השלב הזה לפרט את השימוש בחללי הפנים בקנה מידה מדויק באמצעות תוכניות, חתכים וחזיתות ממוחשבים שיוכנו על ידי אדריכלים ובחירה של התוכניות הטובות ביותר באמצעות פידבק קהילתי. תוכניות ממוחשבות מאפשרות עבודה בקנה מידה ודיוק. בתחילת השלב, אדריכלים יכינו תוכניות ובהמשך, הקהילה תבחר את התוכניות הטובות ביותר תוך התייחסות וביקורת. '
                    },
                    {
                        label: 'שיפור תוכניות',
                        description: 'המטרה של השלב הזה לשפר את התכנון באמצעות שימוש בסקיצות ידניות כדי לטייב את העיצוב ובחירה של הסקיצות הטובות ביותר באמצעות פידבק קהילתי. סקיצות ידניות מאפשרות חופש לפרוץ את הקיבעון העיצובי כדי לפתור בעיות קיימות באמצעות גישות חדשות. בתחילת השלב, אדריכלים יכינו סקיצות ובהמשך, הקהילה תבחר את הסקיצות הטובות ביותר תוך התייחסות וביקורת. '
                    },
                    {
                        label: 'אינטגרציה בתלת מימד',
                        description: 'המטרה של השלב הזה לבצע אינטגרציה אחרונה של סקיצות ותוכניות והפקת מודל תלת ממדי וקביעת העיצוב הנבחר. בתחילת השלב, אדריכלים יכינו את המודלים ובהמשך, הקהילה תבחר את המודל המועדף. '
                    }
                ]
            },



        },

    },
    fallbackLng: "en",
    debug: false,

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    keySeparator: false, // we use content as keys

    interpolation: {
        escapeValue: false, // not needed for react!!
        formatSeparator: ","
    },

    react: {
        wait: true
    }
}

i18n
    .use(LanguageDetector)
    .use(initReactI18next).init(resource)
    .then(() => {
        document.getElementsByTagName('body')[0].setAttribute("dir", i18n.dir())

    })

export default i18n;