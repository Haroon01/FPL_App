import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    { 
        question: 'What is this?', 
        answer: (
            <span>
                This is a <strong>Fantasy Premier League</strong> game built around the English Premier League. 
                It is a community-built alternative to the original game. Built for those who are looking 
                for a new experience, all players are welcome whether they are a seasoned manager or have never 
                played before. What are you waiting for? Bring out your inner Mikel Arteta and take your squad 
                to new heights!
            </span>
        )
    },
    {
        question: 'Whats the point of this when FPL already exists?',
        answer: (
            <span>
                This is an alternative to the original game with many planned features! We are currently in the 
                early stages of development but expect exciting things to come! We plan to offer a great level 
                of customizability such as custom chips, rules for leagues, and many more.
                <strong> Let us know if you have something you'd like to see! </strong>
                One exciting change is that we plan to allow league owners to ban players, 
                meaning a single player cannot dominate your league! Appoint your league leader wisely!
            </span>
        )
    },
    {
        question: 'What are the rules?',
        answer: (
            <span>
                The rules are the same as the original game, with a few exceptions of some planned features 
                further down the road! Some of which are some new chips, such as <strong>All Out Attack</strong>, 
                <strong> Park The Bus</strong>,<strong> The Underdogs</strong> and many more!
            </span>
        )
    },
    {
        question: 'What are the custom chips?',
        answer: (
            <span>
                Custom chips are some new chips that can be played! Some we already have planned are: 
                <ul>
                    <li><strong>All Out Attack</strong>: All Strikers & Midfielders gain double points!</li>
                    <li><strong>Park The Bus</strong>: Goalkeeper & Defenders gain Double Points</li>
                    <li><strong>The Underdogs</strong>: All players outside of the traditional Big 6 gain triple points</li>
                </ul>
                We are open to suggestions for more!
            </span>
        )
    }
    // ...add more FAQs here...
];

const FaqPage = () => {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <div style={{ margin: '20px' }}>
            <Typography variant="h4" color="secondary" style={{ margin: '10px' }} gutterBottom>
                Frequently Asked Questions
            </Typography>
            {faqs.map((faq, index) => (
                <Accordion 
                    key={index}
                    expanded={expanded === `panel${index}`}
                    onChange={handleChange(`panel${index}`)}
                    sx={{
                        '&:before': {
                            display: 'none', // Remove the default MUI inset shadow
                        },
                        boxShadow: 'none', // Remove any outer shadow
                        '&.Mui-expanded': {
                            margin: 'auto', // Remove the additional margin in the expanded state
                            boxShadow: '0 2px 4px rgba(0,0,0,0.1)' // Subtle shadow; adjust or remove as needed
                        }
                    }}
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${index}a-content`}
                        id={`panel${index}a-header`}
                    >
                        <Typography variant='h5'>{faq.question}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            {faq.answer}
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            ))}
        </div>
    );
};

export default FaqPage;