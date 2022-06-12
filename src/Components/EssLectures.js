import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import '../pages/css/Result.css';
import EssLecturesModal from '../components/EssLecturesModal';
import LoadingSpinner from '../components/LoadingSpinner';

const Accordion = styled((props) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    '&:before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
        expandIcon={<ExpandMoreIcon />}
        {...props}
    />
))(({ theme }) => ({
    flexDirection: 'row',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(180deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(-2),
        marginTop: theme.spacing(0.5),
        marginBottom: theme.spacing(1),
    },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(1),
    marginTop: theme.spacing(2),
    backgroundColor: '#F6f6f6',
}));

const EssLectures = () => {
    const [expanded, setExpanded] = useState('panel1');
    const [loading, setLoading] = useState(true);

    const [course, setCourse] = useState();
    const [studentNumber, setStudentNumber] = useState();
    const [engLevel, setEngLevel] = useState();
    const [notTakingNC, setNotTakingNC] = useState(["NULL"]);
    const [notTakingBSM_GS, setNotTakingBSM_GS] = useState(["NULL"]);
    const [notTakingMJ, setNotTakingMJ] = useState(["NULL"]);
    const [leadershipCredit, setleadershipCredit] = useState();
    const [GSCredit, setGSCredit] = useState();
    const [bsmExperimentCredit, setbsmExperimentCredit] = useState();
    const [isTakingNecessaryClass, setIsTakingNecessaryClass] = useState();
    //const [tempString, setTempString] = useState("");
    
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    const calcCredit = (leadershipCredit, GSCredit, bsmExperimentCredit) => {
        if (leadershipCredit < 2) {
            setNotTakingNC(notTakingNC => [...notTakingNC, "리더십 과목 중 택 1"])
        }
        if (GSCredit < 3) {
            setNotTakingBSM_GS(notTakingBSM_GS => [...notTakingBSM_GS, "기본소양 과목 중 택 3"])
        }
        else if (GSCredit < 6) {
            setNotTakingBSM_GS(notTakingBSM_GS => [...notTakingBSM_GS, "기본소양 과목 중 택 2"])
        }
        else if (GSCredit < 9) {
            setNotTakingBSM_GS(notTakingBSM_GS => [...notTakingBSM_GS, "기본소양 과목 중 택 1"])
        }
        if (bsmExperimentCredit < 3) {
            setNotTakingBSM_GS(notTakingMJ => [...notTakingMJ, "과학실험 과목 중 택 1"])
        }
    }

    useEffect(() => {
        const data = {
            email: sessionStorage.getItem('userId')
        }
        fetch("/result/essLectures", {
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((json) => {
            setCourse(json.Course)
            setStudentNumber(json.StudentNumber)
            setEngLevel(json.EngLevel)
            setNotTakingNC(json.notTakingNC)
            setNotTakingBSM_GS(json.notTakingBSM)
            setNotTakingMJ(json.notTakingMJ)
            setleadershipCredit(json.leadershipCredit)
            setGSCredit(json.GSCredit)
            setbsmExperimentCredit(json.bsmExperimentCredit)
            calcCredit(leadershipCredit, GSCredit, bsmExperimentCredit)
            if (notTakingNC.length) setIsTakingNecessaryClass(false)
            else if (notTakingBSM_GS.length) setIsTakingNecessaryClass(false)
            else if (notTakingMJ.length)
            {
                if (notTakingMJ.length === 1 && notTakingMJ[0] === "계산적사고법" && course === "일반" && studentNumber >= 2020) {
                    notTakingMJ.pop()
                }
                else
                    setIsTakingNecessaryClass(false)
            }
            else setIsTakingNecessaryClass(true)
            console.log({"notTakingNC": notTakingNC, "notTakingBSM_GS": notTakingBSM_GS, "notTakingMJ": notTakingMJ})
            console.log(isTakingNecessaryClass)
        })
        setTimeout(()=> {
            setLoading(false)
            console.log("로딩종료") }, 5000)
    })

    return (
        <>
        {loading ? <LoadingSpinner op={false} /> : (
            <Box className="detail_box">
                <Accordion className="acc" onChange={handleChange('panel1')}>
                    {isTakingNecessaryClass ?
                        <AccordionSummary aria-controls="panel1d-content">
                            <div>
                                <img className="check_img0" alt="check_img" src="img/yeah.png"></img>
                                <span className="detail_title2">필수강의</span>
                            </div>
                            <span className="detail_content2">필수강의를 모두 이수하였습니다.</span>
                        </AccordionSummary> :
                        <AccordionSummary aria-controls="panel1d-content">
                            <div>
                                <img className="check_img0" alt="check_img" src="img/nope.png"></img>
                                <span className="detail_title2">필수강의</span>
                            </div>
                            <span className="detail_content2"><b style={{ color: 'crimson' }}>미이수</b>한 필수강의가 있습니다.</span>
                        </AccordionSummary>
                    }
                    <AccordionDetails>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {!notTakingNC.length ?
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                    <span className="category_title">공통교양</span>
                                    <span className="category_content">모두 이수</span>
                                </Stack> :
                                <Stack direction={{ xs: 'column', sm: 'row' }}>
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                        <span className="category_title">공통교양</span>
                                        <span className="category_content" style={{width:80}}><b style={{ color: 'crimson' }}>{notTakingNC.length}개</b> 미이수</span>
                                    </Stack>
                                    <div className="badge_box">
                                        {
                                            notTakingNC.map((names, idx) => (<div style={{display:"inline"}} key={idx}><span className="badge">{names}</span></div>))
                                        }
                                    </div>
                                </Stack>
                            }
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {!notTakingBSM_GS.length ?
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                    <span className="category_title">학문기초</span>
                                    <span className="category_content">모두 이수</span>
                                </Stack> :
                                <Stack direction={{ xs: 'column', sm: 'row' }}>
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                        <span className="category_title">학문기초</span>
                                        <span className="category_content" style={{width:80}}><b style={{ color: 'crimson' }}>{notTakingBSM_GS.length}개</b> 미이수</span>
                                    </Stack>
                                    <div className="badge_box">
                                        {
                                            notTakingBSM_GS.map((names, idx) => (<div style={{display:"inline"}} key={idx}><span className="badge">{names}</span></div>))
                                        }
                                    </div>                                
                                </Stack>
                            }
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {!notTakingMJ.length ?
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                    <span className="category_title">전공</span>
                                    <span className="category_content">모두 이수</span>
                                </Stack> :
                                <Stack direction={{ xs: 'column', sm: 'row' }}>
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                        <span className="category_title">전공</span>
                                        <span className="category_content" style={{width:80}}><b style={{ color: 'crimson' }}>{notTakingMJ.length}개</b> 미이수</span>
                                    </Stack>
                                    <div className="badge_box">
                                        {
                                            notTakingMJ.map((names, idx) => (<div style={{display:"inline"}} key={idx}><span className="badge">{names}</span></div>))
                                        }
                                    </div>                                
                                </Stack>
                            }
                        </Stack>
                        {/* <Stack direction="row" spacing={2} alignItems="center">
                            {leadershipCredit >= 2 ?
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                    <span className="category_title">리더쉽</span>
                                    <span className="category_content">모두 이수</span>
                                </Stack> :
                                <>
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                    <span className="category_title">리더쉽</span>
                                    <span className="category_content">소셜앙트레프러너십과리더십, 글로벌앙트레프러너십과리더십, 테크노앙트레프러너십과리더십 중 하나 이수해야 함</span>
                                </Stack>
                                </>
                            }
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {GSCredit >= 9 ?
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                    <span className="category_title">기본소양</span>
                                    <span className="category_content">모두 이수</span>
                                </Stack> :
                                <>
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                    <span className="category_title">기본소양</span>
                                    <span className="category_content">기술창조와특허, 공학경제, 공학윤리를 이수해야 합니다.</span>
                                </Stack>
                                </>
                            }
                        </Stack>
                        <Stack direction="row" spacing={2} alignItems="center">
                            {bsmExperimentCredit >= 3 ?
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                    <span className="category_title">BSM 실험</span>
                                    <span className="category_content">모두 이수</span>
                                </Stack> :
                                <>
                                <Stack className="category" direction="row" spacing={1}>
                                    <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                    <span className="category_title">BSM 실험</span>
                                    <span className="category_content">BSM 실험과목 중 하나를 이수해야 합니다</span>
                                </Stack>
                                </>
                            }
                        </Stack> */}
                    </AccordionDetails>
                </Accordion>
            </Box>
        )}
        </>
    );
};

export default EssLectures;