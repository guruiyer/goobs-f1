import React, {useEffect, useState} from 'react';
import '../App.less';
import axios from 'axios'
import '../index.css';
import '../News.scss';
import { Card, Col, Row } from 'antd';

const json = [
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Turkey back on F1 calendar as it replaces cancelled Singapore race",
          "description": "The Turkish Grand Prix is reinstated on the Formula 1 calendar this year for the second time.",
          "url": "https://www.bbc.co.uk/sport/formula1/57606329",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/1184D/production/_119075717_lewishamiltonattheturkishgp.jpg",
          "publishedAt": "2021-06-25T09:30:53Z",
          "content": "Lewis Hamilton won his seventh world title at last year's Turkish GP\r\nThe Turkish Grand Prix has been reinstated on the Formula 1 calendar this year for the second time.\r\nTurkey was dropped, two week… [+1792 chars]"
        },
        {
          "source": {
            "id": "bleacher-report",
            "name": "Bleacher Report"
          },
          "author": "Tim Daniels",
          "title": "Lewis Hamilton to Remain in Formula 1 with 2-year Mercedes Contract",
          "description": "Seven-time Formula One champion Lewis\nHamilton signed a two-year contract extension with Mercedes' AMG\nPetronas F1 Team on Saturday that runs through the 2023...",
          "url": "https://bleacherreport.com/articles/10006994-lewis-hamilton-to-remain-in-formula-1-with-2-year-mercedes-contract",
          "urlToImage": "https://media.bleacherreport.com/image/upload/v1625316324/nz0vjl8ujlepnyaig9fm.jpg",
          "publishedAt": "2021-07-03T13:23:42Z",
          "content": "GEORG HOCHMUTH/APA/AFP via Getty Images\r\nSeven-time Formula One champion Lewis\r\nHamilton signed a two-year contract extension with Mercedes' AMG\r\nPetronas F1 Team on Saturday that runs through the 20… [+562 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1 boss Ross Brawn says hydrogen could be future fuel",
          "description": "Hydrogen-powered cars could be the future of Formula 1 according to Ross Brawn, the F1 managing director for motorsports.",
          "url": "https://www.bbc.co.uk/sport/formula1/57842205",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11C11/production/_119412727_lewishamilton.jpg",
          "publishedAt": "2021-07-15T23:01:46Z",
          "content": "Hydrogen could play a role in the future - F1's Brawn\r\nHydrogen-powered cars could be the future of Formula 1, according to F1 managing director for motorsports Ross Brawn. \r\nHe says sustainability i… [+7191 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1: Mercedes will 'make our car faster'",
          "description": "Mercedes say they do have performance upgrades for their car as they seek to keep up with Red Bull in the world championship fight.",
          "url": "https://www.bbc.co.uk/sport/formula1/57651115",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/16A82/production/_119120829_lewishamilton.jpg",
          "publishedAt": "2021-06-29T09:33:34Z",
          "content": "Sunday's Austrian Grand Prix is live on 5 Live and the BBC Sport website\r\nMercedes say they do have performance upgrades for their car as they seek to keep up with Red Bull in the world championship … [+3375 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": "https://www.facebook.com/bbcnews",
          "title": "Covid-19: Formula 1 fans' return to Silverstone 'so strange'",
          "description": "A capacity crowd is due at the British Grand Prix and Silverstone village is welcoming their custom.",
          "url": "https://www.bbc.co.uk/news/uk-england-northamptonshire-57834816",
          "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/2B07/production/_119451011_gettyimageslewis.jpg",
          "publishedAt": "2021-07-16T12:47:28Z",
          "content": "image copyrightMark Thompson/Getty Images\r\nimage captionLewis Hamilton won last year's British Grand Prix, which was held with no fans present due to the coronavirus pandemic\r\nAfter being locked out … [+5135 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "W Series to race alongside Formula 1 for 2021 season",
          "description": "After a cancelled 2020 season due to Covid-19, W Series is back and racing alongside Formula 1 in 2021.",
          "url": "https://www.bbc.co.uk/sport/motorsport/57172587",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/A31D/production/_119075714_veloceracing.jpg",
          "publishedAt": "2021-06-25T19:04:09Z",
          "content": "W Series had their 2021 pre-season testing in May at the Anglesey Circuit in North Wales\r\nIt has been almost 700 days since the last race of W series, but on Saturday the lights will go out on an exc… [+4526 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1: Alfa Romeo extend deal with Sauber",
          "description": "The Alfa Romeo name will continue in Formula 1 for at least another season after the company extended its deal to brand the Sauber team.",
          "url": "https://www.bbc.co.uk/sport/formula1/57839257",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/0AA1/production/_119412720_alfaromeo.jpg",
          "publishedAt": "2021-07-14T16:07:03Z",
          "content": "The British Grand Prix is live on BBC Radio 5 Live, with digital coverage on the BBC Sport website\r\nThe Alfa Romeo name will continue in Formula 1 for at least another season after the company extend… [+990 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1 funds students to increase diversity in motorsport",
          "description": "Formula 1 launches a series of scholarships and apprenticeships for under-represented groups in a bid to increase the sport's diversity.",
          "url": "https://www.bbc.co.uk/sport/formula1/57834391",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/0121/production/_119398200_gettyimages-1233800392.jpg",
          "publishedAt": "2021-07-14T11:32:14Z",
          "content": "F1 chairman Stefano Domenicali has backed moves by Lewis Hamilton to increase diversity\r\nFormula 1 has launched a series of scholarships and apprenticeships for under-represented groups in a bid to i… [+1472 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1: Aston Martin poach Red Bull's head of aerodynamics Dan Fallows",
          "description": "Aston Martin poach Red Bull's head of aerodynamics Dan Fallows to be the team's new technical director.",
          "url": "https://www.bbc.co.uk/sport/formula1/57612585",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/BFCA/production/_119089094_danfallows.jpg",
          "publishedAt": "2021-06-25T12:17:35Z",
          "content": "Fallows (left) joined Red Bull in 2006 and was promoted to head of aerodynamics in 2014\r\nAston Martin have poached Red Bull's head of aerodynamics Dan Fallows to be their new technical director.\r\nThe… [+2239 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Lawrence Stroll says Aston Martin will have to wait for Formula 1 titles",
          "description": "Aston Martin team owner Lawrence Stroll expects it to be another four or five years before his team can fight for the F1 title.",
          "url": "https://www.bbc.co.uk/sport/formula1/57808355",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/077F/production/_119391910_lawrencestroll.jpg",
          "publishedAt": "2021-07-13T21:04:44Z",
          "content": "The British Grand Prix is live on 5 Live and the BBC Sport website\r\nAston Martin team owner Lawrence Stroll expects it to be another four or five years before his team can realise his ambition of fig… [+5146 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1: Lando Norris mugged and McLaren watch stolen after Euro 2020 final",
          "description": "Formula 1 driver Lando Norris was mugged and his team-issued watch stolen after the Euro 2020 final at Wembley on Sunday.",
          "url": "https://www.bbc.co.uk/sport/formula1/57818938",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/11DA8/production/_119382137_tv068399055.jpg",
          "publishedAt": "2021-07-13T09:07:09Z",
          "content": "Norris qualified second for the Austrian Grand Prix earlier this month, before claiming a third-place finish in the race\r\nFormula 1 driver Lando Norris was mugged and his team-issued watch worth £40,… [+1011 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1: Red Bull's Christian Horner says pit stop rule change 'disappointing'",
          "description": "Red Bull team principal Christian Horner describes a rule change introduced to ensure safety at pit stops as \"disappointing\".",
          "url": "https://www.bbc.co.uk/sport/formula1/57615628",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/E11D/production/_119092675_redbullcrew.jpg",
          "publishedAt": "2021-06-25T16:00:47Z",
          "content": "Red Bull hold the world record for the fastest pit stop in Formula 1, which stands at 1.82 seconds\r\nRed Bull team principal Christian Horner has described a rule change introduced to ensure safety at… [+4441 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Formula 1: Pirelli to trial new tyre for Austrian Grand Prix",
          "description": "Pirelli is to trial a new design of rear tyre at next weekend's Austrian Grand Prix following the two high-speed failures in Azerbaijan this month.",
          "url": "https://www.bbc.co.uk/sport/formula1/57618405",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/16B15/production/_119094929_maxverstappen.jpg",
          "publishedAt": "2021-06-25T17:14:57Z",
          "content": "Saturday's final practice and qualifying is live on 5 Live Sports Extra and the BBC Sport website\r\nPirelli is to trial a new design of rear tyre at next weekend's Austrian Grand Prix following the tw… [+2933 chars]"
        },
        {
          "source": {
            "id": "bleacher-report",
            "name": "Bleacher Report"
          },
          "author": "Chris Roling",
          "title": "F1 2021 Review: Braking Point Impressions, Gameplay Videos and Esports Appeal",
          "description": "The team at Codemasters, in tandem with EA Sports, one-upped itself last year with the superb F1 2020—and now has to do so again this year with F1 2021...",
          "url": "https://bleacherreport.com/articles/2945790-f1-2021-review-braking-point-impressions-gameplay-videos-and-esports-appeal",
          "urlToImage": "https://img.bleacherreport.net/img/images/photos/003/915/354/36ef0b431a6cfdc0f602e7dec93ce5d0_crop_exact.jpg?w=1200&h=1200&q=75",
          "publishedAt": "2021-07-12T15:21:38Z",
          "content": "EA Sports\r\nThe team at Codemasters, in tandem with EA Sports, one-upped itself last year with the superb F1 2020and now has to do so again this year with F1 2021.  \r\nA year ago, the task was sending … [+10094 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "British Grand Prix sprint qualifying: F1's break with history",
          "description": "Formula 1 is making a break with history, with the introduction of a new weekend format that includes a second race in addition to the main event.",
          "url": "https://www.bbc.co.uk/sport/formula1/57839254",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/653F/production/_119391952_f1carinlondon.jpg",
          "publishedAt": "2021-07-14T17:16:02Z",
          "content": "The British Grand Prix is live on BBC Radio 5 Live, with digital coverage on the BBC Sport website\r\nFormula 1 is making a break with history at this weekend's British Grand Prix, with the introductio… [+7542 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "British Grand Prix: 'F1 breaks new ground but jury still out on sprint qualifying'",
          "description": "F1 broke new ground with the advent of sprint qualifying but uncertainty remains over whether the exercise was a success, writes Andrew Benson.",
          "url": "https://www.bbc.co.uk/sport/formula1/57876348",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/03B3/production/_119474900_hi068654821.jpg",
          "publishedAt": "2021-07-17T18:58:49Z",
          "content": "Build-up to the British Grand Prix is starts on the BBC Sport website from 13:30 BST on Sunday\r\nAt the circuit where the Formula 1 World Championship started in 1950, the sport made a decisive break … [+8388 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Austrian Grand Prix: Max Verstappen is favourite on current form to lift F1 title, says Fernando Alonso",
          "description": "Two-time world champion Fernando Alonso says Red Bull's Max Verstappen is favourite to beat Lewis Hamilton and win the Formula 1 title on current form.",
          "url": "https://www.bbc.co.uk/sport/formula1/57685925",
          "urlToImage": "https://ichef.bbci.co.uk/live-experience/cps/624/cpsprodpb/21B3/production/_119172680_hi068261049.jpg",
          "publishedAt": "2021-07-01T15:18:10Z",
          "content": "Verstappen is aiming to secure his third win in a row at this weekend's Austrian Grand Prix\r\nRed Bull's Max Verstappen is favourite to beat Lewis Hamilton and win the Formula 1 title on current form,… [+5022 chars]"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": null,
          "title": "Does the sprint race bring another dimension to F1? 'We'll see,' says Red Bull chief Christian Horner",
          "description": "Red Bull team principal Christian Horner shares his thoughts with BBC Sport's Rob Bonnet on the new sprint race format which is being introduced at the British Grand Prix.",
          "url": "https://www.bbc.co.uk/sport/av/formula1/57853599",
          "urlToImage": "https://ichef.bbci.co.uk/news/1024/cpsprodpb/7550/production/_119423003_p09pjmyg.jpg",
          "publishedAt": "2021-07-15T16:14:48Z",
          "content": "Up Next. Max Whitlock v Liv Cooke in balance, speed &amp; skill test - who wins? Video, 00:03:41Max Whitlock v Liv Cooke in balance, speed &amp; skill test - who wins?"
        },
        {
          "source": {
            "id": "bbc-news",
            "name": "BBC News"
          },
          "author": "https://www.facebook.com/bbcnews",
          "title": "Covid-19: UK daily cases surpass 50,000 and F1 fans return to Silverstone",
          "description": "Five things you need to know about the coronavirus pandemic this Friday evening.",
          "url": "https://www.bbc.co.uk/news/uk-57865573",
          "urlToImage": "https://ichef.bbci.co.uk/news/1024/branded_news/CC94/production/_111527325_index_daily_update_version02_cv_976new.png",
          "publishedAt": "2021-07-16T16:10:31Z",
          "content": "Here are five things you need to know about the coronavirus pandemic this Friday evening. We'll have another update for you tomorrow morning.\r\nThe UK has recorded more than 50,000 coronavirus cases f… [+3901 chars]"
        },
        {
          "source": {
            "id": "abc-news-au",
            "name": "ABC News (AU)"
          },
          "author": "Daniela Intili",
          "title": "The F1 technology powering our Paralympic basketball team",
          "description": "It's hoped custom-made carbon-fibre seats used in Formula 1 cars will make the Rollers lighter, faster and stronger, powering them to the top of the podium at the Tokyo Games.",
          "url": "https://www.abc.net.au/news/2021-06-25/f1-technology-powering-paralympic-basketball-team-rollers-tokyo/100233852",
          "urlToImage": "https://live-production.wcms.abc-cdn.net.au/7096335a54ad9d1af01f939074caba29?impolicy=wcms_crop_resize&cropH=803&cropW=1427&xPos=0&yPos=88&width=862&height=485",
          "publishedAt": "2021-06-24T18:52:38Z",
          "content": "Tom O'Neill-Thorne knew the exact moment he wanted to become an athlete. He was three years old and watching the 2000 Sydney Olympics on television. \r\nKey points:\r\n<ul><li>The AIS is using Formula 1 … [+6401 chars]"
        }
      ]

export const NewsRoom = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([]);
    const api_key = process.env.REACT_APP_NEWS_API_KEY
    const url = `https://newsapi.org/v2/everything?qInTitle=(Formula+1)+OR+(F1)&apiKey=${api_key}&language=en&sortBy=relevancy&sources=bbc-news,bleacher-report,google-news,abc-news-au,bbc-sport.json`    
    const driverInfoURL = "http://localhost:3000/driverinfo";
    const { Meta } = Card;

    function lContentStyle(image) {
        return {backgroundImage: `url(${image})`, width: '100%',
        textAlign: 'center',
        height: 200,
        width: 300,
        backgroundSize: 'cover', fontSize: '16px', fontWeight: 'bold', width: 540, height: 200 }
    }

    function LBoxContent(props) {
        return     <Card
    style={{ width: 340, height: 300 }}
    cover={
      <img
        alt="example"
        src={props.article.image}
        style={{height: 170}}
      />
    }>
    <Meta
      title={props.article.title}
      description={props.article.title}
    />
  </Card>

    }

    useEffect(() => {
        axios.get(driverInfoURL)
            .then(function(res) {
                setData(json.map((article) => {
                    return {    
                        title: article.title,
                        description: article.description,
                        url: article.url,
                        image: article.urlToImage,
                        source: article.source.name
                    }
                }))  
                setIsLoading(false)
                console.log("data" + data)
            })
            .catch(function(e) {
                console.log("ERROR ", e);
            })
      }, [setData])

    return (  
        <React.Fragment>  
            <div style={{ }}>
                <div> <br/> </div>
                    <Row gutter={[10, 15]}>
                        {data.map(article =>      
                            <Col className="gutter-row" span={3}>
                                <LBoxContent article={article}/>  
                            </Col>
                        )}
                    </Row>
                <div> <br/> </div>    
            </div>
        </React.Fragment>
    );

}