import React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/system";
import Box from "@mui/material/Box";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import "./viewjobs-portrait-mode.css";

const StyledAccordion = styled(Accordion)({
    ".root": {
        "& #panel1bh-header": {
            width: "15rem",
        },
    },
    ".details": {
        display: "grid",
    },
    ".accordionButtonsWrapper": {
        "& .accordionButtons": {
            backgroundColor: "#000000",
            color: "#fff",
            padding: "8px 22px",
            margin: "2%",
            borderRadius: "4px",
        },
    },
    ".css-sh22l5-MuiButtonBase-root-MuiAccordionSummary-root" : {
        padding: '0px 16px',
        display: 'flex',
    },
});

export default function ControlledAccordions (props) {
    const [expanded, setExpanded] = React.useState("panel1");
    const { jobs, parentCallback } = props;

    const rows = jobs.payload;

    const handleChange = panel => (event, isExpanded) =>
        setExpanded(isExpanded ? panel : false);

    const handleDiaryClick = (event, rows) => {
        const params = {
            rows,
            jobDetailsPath: `/view/jobs/diary/details/${rows.id}`,
            componentType: "diary",
        };

        parentCallback(params);
    };

    const handleJobDetailsClick = (event, row) => {
        const params = {
            componentType: "jobDetails",
            detailsPath: `/view/jobs/details/${row.jobId}`,
            rows: { row }
        };
        parentCallback(params);
    };
   
    const listRows = () =>
        rows.map(row => {
            return (
                <StyledAccordion
                    key={row.jobId}
                    expanded={expanded === "panel1"}
                    onChange={handleChange("panel1")}
                    className='root'
                >
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1bh-content'
                        id='panel1bh-header'
                    >
                        <Typography
                            id='typographyName'
                            sx={{
                                fontWeight: "bold !important",
                            }}
                        >
                            Name
                        </Typography>
                        <Typography
                            component='span'
                            sx={{
                                color: "text.secondary",
                                padding: "0 0.5rem 0 0",
                            }}
                        >
                            {row.name}
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box sx={{ minWidth: 275 }} id='stvBox'>
                            <Container
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                }}
                            >
                                <div className='wrapper'>
                                    <div className='details'>
                                        <Typography
                                            id='desc'
                                            sx={{
                                                width: "33%",
                                                flexShrink: 0,
                                                marginLeft:
                                                    "-.95rem !important",
                                                fontWeight: "bold !important",
                                            }}
                                        >
                                            Summary
                                        </Typography>
                                        <Typography
                                            id='content'
                                            sx={{
                                                fontSize: "1rem",
                                                padding: "0 1%",
                                            }}
                                            color='text.secondary'
                                            gutterBottom
                                        >
                                            {row.description}
                                        </Typography>
                                    </div>
                                    <div>
                                        <Typography
                                            id='stat'
                                            sx={{
                                                width: "33%",
                                                flexShrink: 0,
                                                marginLeft:
                                                    "-.95rem !important",
                                                fontWeight: "bold !important",
                                            }}
                                        >
                                            Status
                                        </Typography>
                                        <Typography
                                            id='status'
                                            sx={{
                                                fontSize: "1rem",
                                                padding: "1%",
                                            }}
                                            color='text.secondary'
                                            gutterBottom
                                        >
                                            {row.status}
                                        </Typography>
                                    </div>
                                </div>
                                <div className='accordionButtonsWrapper' id="buttonsWrapper">
                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className='accordionButtons'
                                        onClick={event => {
                                            handleJobDetailsClick(event, row);
                                        }}
                                    >
                                        <EditIcon />
                                    </Button>

                                    <Button
                                        variant='contained'
                                        color='primary'
                                        className='accordionButtons'

                                        onClick={event => {
                                            handleDiaryClick(event, row);
                                        }}
                                    >
                                        <MenuBookIcon />
                                    </Button>
                                </div>
                            </Container>
                        </Box>
                    </AccordionDetails>
                </StyledAccordion>
            );
        });

    return <div style={{ marginBottom: "25%" }}>{listRows()}</div>;
}
