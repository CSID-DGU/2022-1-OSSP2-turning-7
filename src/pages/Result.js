import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './css/Result.css';
import Header from '../Components/Header';
import AlertModal from '../Components/AlertModal';
import LoadingSpinner from '../Components/LoadingSpinner';
import EssLectures from '../Components/EssLectures';

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

const Result = () => {
    const [expanded, setExpanded] = useState('panel1');
    const [loading, setLoading] = useState(true);
    const [hasResult, setHasResult] = useState();
    const [course, setCourse] = useState();
    const [studentNumber, setStudentNumber] = useState();
    const [engLevel, setEngLevel] = useState();
    const [register, setRegister] = useState();
    const [engScore, setEngScore] = useState();
    const [totalCredit, setTotalCredit] = useState();
    const [commonClassCredit, setCommonClassCredit] = useState();
    const [gibonSoyangCredit, setGibonSoyangCredit] = useState();
    const [bsmCredit, setBsmCredit] = useState();
    const [bsmMathCredit, setBsmMathCredit] = useState();
    const [bsmSciCredit, setBsmSciCredit] = useState();
    const [majorCredit, setMajorCredit] = useState();
    const [specialMajorCredit, setSpecialMajorCredit] = useState();
    const [engClassCount, setEngClassCount] = useState();
    const [totalScore, setTotalScore] = useState();

    const [isGraduate, setIsGraduate] = useState();
    const [isRegister, setIsRegister] = useState();
    const [isEngScore, setIsEngScore] = useState();
    const [isTotalCredit, setIsTotalCredit] = useState();
    const [isCommonClassCredit, setIsCommonClassCredit] = useState();
    const [isBsmCredit, setIsBsmCredit] = useState();
    const [isMajorCredit, setIsMajorCredit] = useState();
    const [isEngClassCount, setIsEngClassCount] = useState();
    const [isTotalScore, setIsTotalScore] = useState();

    const [major_Credit, setmajor_Credit] = useState();
    const [total_Credit, settotal_Credit] = useState();
    
    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    useEffect(() => {
        const data = {
            email: sessionStorage.getItem('userId')
        }
        fetch("/result", {
            method: 'post',
            headers: {
                "content-type": "application/json",
            },
            body: JSON.stringify(data)
        })
        .then((res) => res.json())
        .then((json) => {
            console.log(json)
            setHasResult(json.Result)
            setCourse(json.Course)
            setStudentNumber(json.StudentNumber)
            setEngLevel(json.EngLevel)
            setRegister(json.Register)
            setEngScore(json.EngScore)
            setTotalCredit(json.TotalCredit)
            setCommonClassCredit(json.CommonClassCredit)
            setGibonSoyangCredit(json.GibonsoyangCredit)
            setBsmCredit(json.BSMCredit)
            setBsmMathCredit(json.BSMMathCredit)
            setBsmSciCredit(json.BSMSciCredit)
            setMajorCredit(json.MajorCredit)
            setSpecialMajorCredit(json.SpecialMajorCredit)
            setEngClassCount(json.EngClassCount)
            setTotalScore(json.TotalScore)
        
            if (register >= 8) setIsRegister(true)
            else setIsRegister(false)
            if (engScore >= 700) setIsEngScore(true)
            else setIsEngScore(false)
            if (course === '??????'){
                if (totalCredit >= 140) {
                    setIsTotalCredit(true)
                    settotal_Credit(totalCredit)
                }
                else{
                    setIsTotalCredit(false)
                    settotal_Credit(140 - totalCredit)
                } 
            }
            else {
                if (totalCredit >= 130) {
                    setIsTotalCredit(true)
                    settotal_Credit(totalCredit)
                }
                else {
                    setIsTotalCredit(false)
                    settotal_Credit(130 - totalCredit)
                }
            }

            if (commonClassCredit >= 14) setIsCommonClassCredit(true)
            else setIsCommonClassCredit(false)
            if (bsmCredit >= 21) setIsBsmCredit(true)
            else setIsBsmCredit(false)
            if (course === '??????'){
                if (majorCredit >= 84) {
                    setIsMajorCredit(true)
                    setmajor_Credit(84)
                    
                }
                else{
                    setIsMajorCredit(false)
                    setmajor_Credit(84)
                } 
            }
            else {
                if (majorCredit >= 72) {
                    setIsMajorCredit(true)
                    setmajor_Credit(72)
                }
                else {
                    setIsMajorCredit(false)
                    setmajor_Credit(72)
                }
            }
            if (totalScore >= 2.0) setIsTotalScore(true)
            else setIsTotalScore(false)
            if (engClassCount >= 4) setIsEngClassCount(true)
            else setIsEngClassCount(false)
            if (isRegister && isEngScore && isTotalCredit && isCommonClassCredit && isBsmCredit && isMajorCredit && isEngClassCount && isTotalScore) setIsGraduate(true)
            else setIsGraduate(false)
        })
        setTimeout(()=> {
            setLoading(false)
            console.log("????????????") }, 5000)
    })

    return (
        <>
        {loading ? <LoadingSpinner op={true} /> : (
            <div className="fade-in">
                {!hasResult && 
                    <AlertModal 
                        msg1="????????? ????????? ????????????."
                        msg2="?????? ????????? ??????????????????!"
                        move1="/input"
                        move2="/"
                        op1="??????"
                        op2="??????"
                        />
                }
                <Header mypage signout />
                {isGraduate ? 
                    <Stack className="result_stack" justifyContent="center" direction="row">
                        <span className="r0">??????</span>
                        <span className="r2">??????</span>
                        <span className="r0">?????????! ????</span>
                    </Stack> :
                    <Stack className="result_stack" justifyContent="center" direction="row">
                        <span className="r0">??????</span>
                        <span className="r1">?????????</span>
                        <span className="r0">?????????!</span>
                    </Stack>
                }
                <Box className="result_detail">
                    {isRegister ? 
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/yeah.png"></img>
                                <span className="detail_title">????????????</span>
                            </div>
                            <span className="detail_content"><u>{register}??????</u>??? ?????????????????????.</span>
                        </Box> : 
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/nope.png"></img>
                                <span className="detail_title">????????????</span>
                            </div>
                            <span className="detail_content"><u>{register}??????</u>??? ?????????????????????. <b style={{ color: 'crimson' }}>{8-register}??????</b>??? ???????????????.</span>
                        </Box>
                    }
                    {isEngScore ?
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/yeah.png"></img>
                                <span className="detail_title">???????????????</span>
                            </div>
                            <span className="detail_content"><u>{engScore}???</u>?????? 700??? ???????????????.</span>
                        </Box> :
                        <Box className="detail_box">
                        <div className="stack">
                            <img className="check_img" alt="check_img" src="img/nope.png"></img>
                            <span className="detail_title">???????????????</span>
                        </div>
                        <span className="detail_content"><u>{engScore}???</u>?????? 700??? <b style={{ color: 'crimson' }}>??????</b>?????????.</span>
                        </Box>
                    }
                    <Box className="detail_box" >
                        <Accordion className="acc" onChange={handleChange('panel1')}>
                            {isTotalCredit ?
                                <AccordionSummary aria-controls="panel1d-content">
                                    <div>
                                        <img className="check_img0" alt="check_img" src="img/yeah.png"></img>
                                        <span className="detail_title2">????????????</span>
                                    </div>
                                    <span className="detail_content2">??? <u>{totalCredit}??????</u>?????? 140?????? ???????????????.</span>
                                </AccordionSummary> :
                                <AccordionSummary aria-controls="panel1d-content">
                                <div>
                                    <img className="check_img0" alt="check_img" src="img/nope.png"></img>
                                    <span className="detail_title2">????????????</span>
                                </div>
                                <span className="detail_content2">??? <u>{totalCredit}??????</u>?????? <b style={{ color: 'crimson' }}>{total_Credit}??????</b>??? ???????????????.</span>
                                </AccordionSummary>
                            } 
                            <AccordionDetails>
                                {isCommonClassCredit ?
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                        <span className="category_title">????????????</span>
                                        <span className="category_content">{commonClassCredit}?????? / 14??????</span>
                                    </Stack> :
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                        <span className="category_title">????????????</span>
                                        <span className="category_content"><b style={{ color: 'crimson' }}>{commonClassCredit ? commonClassCredit : 0}??????</b> / 14??????</span>
                                    </Stack>
                                }
                                {isBsmCredit ?
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                        <span className="category_title">????????????</span>
                                        <span className="category_content">{bsmCredit}?????? / 21??????</span>
                                    </Stack> :
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                        <span className="category_title">????????????</span>
                                        <span className="category_content"><b style={{ color: 'crimson' }}>{bsmCredit ? bsmCredit : 0}??????</b> / 21??????</span>
                                    </Stack>
                                }
                                {isMajorCredit ?
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/yeah.png"></img>
                                        <span className="category_title">??????</span>
                                        <span className="category_content">{majorCredit}?????? / 84??????</span>
                                    </Stack> :
                                    <Stack className="category" direction="row" spacing={1}>
                                        <img className="check_img2" alt="check_img" src="img/nope.png"></img>
                                        <span className="category_title">??????</span>
                                        <span className="category_content"><b style={{ color: 'crimson' }}>{majorCredit ? majorCredit : 0}??????</b> / {major_Credit}??????</span>
                                    </Stack>
                                }
                            </AccordionDetails>
                        </Accordion>
                    </Box>
                    {isTotalScore ?
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/yeah.png"></img>
                                <span className="detail_title">????????????</span>
                            </div>
                            <span className="detail_content"><u>{totalScore}???</u>?????? 2.0??? ???????????????.</span>
                        </Box> :
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/nope.png"></img>
                                <span className="detail_title">????????????</span>
                            </div>
                            <span className="detail_content"><u>{totalScore}???</u>?????? 2.0??? <b style={{ color: 'crimson' }}>??????</b>?????????.</span>
                        </Box>
                    }
                    {isEngClassCount ?
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/yeah.png"></img>
                                <span className="detail_title">????????????</span>
                            </div>
                            <span className="detail_content"><u>{engClassCount}??????</u>??? ?????????????????????.</span>
                        </Box> :
                        <Box className="detail_box">
                            <div className="stack">
                                <img className="check_img" alt="check_img" src="img/nope.png"></img>
                                <span className="detail_title">????????????</span>
                            </div>
                            <span className="detail_content"><u>{engClassCount}??????</u>??? ?????????????????????. <b style={{ color: 'crimson' }}>{4-engClassCount}??????</b>??? ???????????????.</span>
                        </Box>
                    }
                    <EssLectures />
                </Box>
            </div>
        )}
        </>
    );
};

export default Result;