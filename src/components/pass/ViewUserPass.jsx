import React, { useEffect, useState } from "react";
import api from "../../axios/axios";
import { useNavigate, useParams } from "react-router-dom";
import AnimationWrapper from "../Animation-wrapper/AnimationWrapper";
import toast from "react-hot-toast";

const ViewUserPass = () => {
  const navigate = useNavigate()
  const { userId } = useParams();
  const [pass, setPass] = useState("");
  const [user, setUSer] = useState("");
  const [editor, setEditor] = useState("");

  const data = pass;



  const editorContent = editor;


  let dynamicContent;

  if (editorContent) {
    const editorData = JSON.parse(editorContent);

    dynamicContent = editorData.blocks.map((item, index) => {
      // Common styles for different cases
      const commonStyles = {
        fontSize: "18px",
        lineHeight: "1.5",
        marginBottom: "10px",
      };

      switch (item.type) {
        case "paragraph":
          return (
            <p style={{ ...commonStyles, fontSize: "20px" }} key={index}>
              {item.data.text}
            </p>
          );

        case "list":
          const listItems = item.data.items.map((li, liIndex) => (
            <li style={{ ...commonStyles }} key={liIndex}>
              {li}
            </li>
          ));
          const listTag = item.data.style === "ordered" ? "ol" : "ul";
          const listStyleType =
            item.data.style === "ordered" ? "decimal" : "disc";
          return React.createElement(
            listTag,
            { style: { ...commonStyles, listStyleType }, key: index },
            listItems
          );

        case "header":
          return (
            <h2
              style={{ ...commonStyles, fontSize: "20px", fontWeight: "bold" }}
              key={index}
            >
              {item.data.text}
            </h2>
          );

        default:
          return null; // Handle other types if needed
      }
    });
  }



  useEffect(() => {
    api.post("/get-pass-by-id", { userId }).then((res) => {
      if (res.status === 200) {


        if (res.data.response.passID == null) {
          toast.error("pass is deleted from the database")
          navigate(-1)
          return
        }

        setPass(res.data.response.passID);
        setUSer(res.data.response);

        if (
          res.data.response.passID.editor &&
          res.data.response.passID.editor.length > 0
        ) {
          setEditor(res.data.response.passID.editor[0]);
        } else {
          console.error("Editor data is not available.");
        }
      }
    });
  }, []);



  const printContent = () => {
    window.print();
  };

  return (
    <AnimationWrapper>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
          <style></style>
          <title>Document</title>
        </head>
        <body>
          <table
            width="600"
            border="0"
            cellspacing="0"
            cellpadding="0"
            align="center"
            style={{
              backgroundImage: 'url("https://ci3.googleusercontent.com/meips/ADKq_NYXOeCz-9wPU31clhgzOWutn2S7aUEANh0_qepRTG_eG8azn07FGUYRUClEppBEI4pfHTZJNu5UOZ2gMO_4CNq1x4zzr1KidZfXyaDOR58=s0-d-e1-ft#https://entrypass.bllconnect.org/assets/images/bgImg.jpeg")'
            }}

          >
            <tbody>
              <tr>
                <td
                  style={{
                    borderRight: "#e6e6e6 solid 1px",
                    borderLeft: "#e6e6e6 solid 1px",
                    borderTop: "#e6e6e6 solid 1px",
                    borderBottom: "#e6e6e6 solid 1px",
                    paddingTop: "15px",
                    paddingBottom: "15px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                  }}
                >
                  <table
                    width="100%"
                    border={0}
                    cellPadding={0}
                    cellSpacing={0}
                    style={{
                      borderRight: "gold solid 4px",
                      borderLeft: "gold solid 4px",
                      borderTop: "gold solid 4px",
                      borderBottom: "gold solid 4px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <tbody>
                      <tr className="noprint2">
                        <td height="15"></td>
                      </tr>
                      <tr className="noprint2 flex justify-end px-4">
                        <button className="px-4 py-2 text-red-600 border border-red-500 rounded-md  font-bold hover:bg-red-400 hover:text-white duration-100" onClick={printContent}>Save Pass</button>
                      </tr>
                      <tr>
                        <td>
                          <table
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                            className="table"
                          >
                            <tbody>
                              <tr>
                                <td width="5%"></td>
                                <td width="90%">
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                    className="table"
                                  >
                                    <tbody>
                                      <tr>
                                        <td height="15"></td>
                                      </tr>
                                      <tr style={{ textAlign: "center" }}>
                                        <td
                                          style={{
                                            color: "gold",
                                            lineHeight: "1.1em",
                                            fontSize: "2em",
                                            fontWeight: "bold",
                                          }}
                                        >
                                          Entry Pass For
                                        </td>
                                      </tr>

                                      <tr style={{ textAlign: "center", }}>
                                        <td
                                          style={{
                                            color: "#545454",
                                            lineHeight: "1.1em",
                                            fontSize: "3em",
                                            fontWeight: 700,
                                            textTransform: "capitalize",

                                          }}
                                        >
                                          {user.fname + " " + user.lname}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="15"></td>
                                      </tr>
                                      <tr style={{ textAlign: "center" }}>
                                        <td
                                          style={{
                                            color: "#545454",
                                            lineHeight: "1.2em",
                                            fontSize: "1.1em",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {user.id}
                                        </td>
                                      </tr>

                                     
                                      <tr style={{ textAlign: "center" }}>
                                        <td className="logo-wrapper">
                                          <img
                                            src={data.logourl}
                                            style={{
                                              width: "80%",
                                              height: "100%",
                                              margin:'0 auto'
                                            }}
                                            className="img-fluid logo"
                                            alt="Logo"
                                          />
                                        </td>
                                      </tr>
                                      <tr>
                                        <td  style={{
                                            color: "#000",
                                            lineHeight: "1.1em",
                                            fontSize: "2em",
                                            fontWeight: 700,
                                            textAlign:"center"
                                          }} >{data.heading}</td>
                                      </tr>
                                      <tr>
                                        <td height="15"></td>
                                      </tr>
                                      <tr style={{ textAlign: "center" }}>
                                        <td
                                          style={{
                                            color: "#000",
                                            lineHeight: "1.1em",
                                            fontSize: "1.6em",
                                            fontWeight: 700,
                                          }}
                                        >
                                          {data.date}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="15"></td>
                                      </tr>

                                      <tr>
                                        <hr />

                                      </tr>
                                      <tr style={{ textAlign: "center" }}>
                                        <td
                                          style={{
                                            color: "#000",
                                            lineHeight: "1.1em",
                                            fontSize: "1.6em",
                                            fontWeight: 700,
                                          }}
                                        >
                                          VENUE ADDRESS
                                        </td>
                                      </tr>

                                      <tr style={{ textAlign: "center" }}>
                                        <td
                                          style={{
                                            color: "#000",
                                            fontSize: "1.2em",
                                          }}
                                        >
                                          {data.address}
                                        </td>
                                      </tr>

                                      <tr style={{ textAlign: "center" }}>
                                        <td>
                                          <a
                                            href={data.location}
                                            target="_blank"
                                            style={{
                                              color: "#fff",
                                              textDecoration: "none",
                                            }}
                                          >
                                            <button
                                              type="button"
                                              className="btnclick"
                                              style={{
                                                width: "50%",
                                                padding: "10px",
                                                background: "#393464ed",
                                                fontWeight: "700",
                                                border: "none",
                                                color: "#fff",
                                                borderRadius: "7px",
                                              }}
                                            >
                                              <span>
                                                <i className="fas fa-angle-double-right"></i>{" "}
                                              </span>
                                              Google Map Location
                                            </button>
                                          </a>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td height="15"></td>
                                      </tr>
                                      <tr style={{ textAlign: "center" }}>
                                        <td
                                          style={{
                                            color: "#000",
                                            lineHeight: "1.1em",
                                            fontSize: "1.6em",
                                            fontWeight: "700",
                                          }}
                                        >
                                          Event Entry: {data.time}
                                        </td>
                                      </tr>

                                      <tr>
                                        <td height="15"></td>
                                      </tr>
                                      <tr style={{ textAlign: "center" }}>
                                        <td>
                                          <a
                                            href={data.details}
                                            target="_blank"
                                            style={{
                                              color: "#fff",
                                              textDecoration: "none",
                                            }}
                                          >
                                            <button
                                              type="button"
                                              className="btnclick"
                                              style={{
                                                width: "50%",
                                                padding: "10px",
                                                background: "#393464ed",
                                                fontWeight: "700",
                                                border: "none",
                                                color: "#fff",
                                                borderRadius: "7px",
                                              }}
                                            >
                                              <span>
                                                <i className="fas fa-angle-double-right"></i>{" "}
                                              </span>
                                              Click here to view event details
                                            </button>
                                          </a>
                                        </td>
                                      </tr>
                                      <tr>
                                        <hr />

                                      </tr>


                                      <tr>
                                        <td
                                          style={{
                                            fontSize: "1em",
                                            lineHeight: "1.2em",
                                            textAlign: "center",
                                          }}
                                        >
                                          <p style={{ marginBottom: 0 }}>
                                            For any queries contact :
                                            {data.mobno1} {data.mobno2 == 'null' ?"":" / "+data.mobno2}
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td width="5%"></td>
                              </tr>

                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
          <table
            width="600"
            border="0"
            cellspacing="0"
            cellpadding="0"
            align="center"
            style={{
              marginTop: '3em',
              backgroundImage: 'url("https://ci3.googleusercontent.com/meips/ADKq_NYXOeCz-9wPU31clhgzOWutn2S7aUEANh0_qepRTG_eG8azn07FGUYRUClEppBEI4pfHTZJNu5UOZ2gMO_4CNq1x4zzr1KidZfXyaDOR58=s0-d-e1-ft#https://entrypass.bllconnect.org/assets/images/bgImg.jpeg")'
            }}

          >
            <tbody>
              <tr>
                <td
                  style={{
                    borderRight: "#e6e6e6 solid 1px",
                    borderLeft: "#e6e6e6 solid 1px",
                    borderTop: "#e6e6e6 solid 1px",
                    borderBottom: "#e6e6e6 solid 1px",
                    paddingTop: "15px",
                    paddingLeft: "15px",
                    paddingRight: "15px",
                    paddingBottom: "15px",
                  }}
                >
                  <table
                    width="100%"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    style={{
                      borderRight: "gold solid 4px",
                      borderLeft: "gold solid 4px",
                      borderTop: "gold solid 4px",
                      borderBottom: "gold solid 4px",
                      backgroundColor: "#fff",
                    }}
                  >
                    <tbody>
                      <tr>
                        <td height="15"></td>
                      </tr>
                      <tr>
                        <td>
                          <table
                            width="100%"
                            border="0"
                            cellpadding="0"
                            cellspacing="0"
                          >
                            <tbody>
                              <tr>
                                <td width="5%"></td>
                                <td width="90%">
                                  <table
                                    width="100%"
                                    cellpadding="0"
                                    cellspacing="0"
                                    border="0"
                                  >
                                    <tbody>
                                      <tr>
                                        <td height="15"></td>
                                      </tr>

                                      <tr>
                                        <td height="15"></td>
                                      </tr>

                                      <tr style={{ textAlign: "left" }}>
                                        <td
                                          style={{
                                            color: "#000",
                                            fontSize: "24px",
                                          }}
                                        >
                                          <div>{dynamicContent}</div>
                                        </td>
                                      </tr>

                                      <tr>
                                        <td height="10"></td>
                                      </tr>

                                      <tr>
                                        <td height="10"></td>
                                      </tr>

                                      <tr>
                                        <td height="15">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td height="15">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: "1em",
                                            lineHeight: "1.2em",
                                            textAlign: "center",
                                          }}
                                        // style={{ fontSize: '1em',
                                        // lineHeight: '1.2em',
                                        // textAlign: 'center',
                                        // borderTop: '1px solid #000',}}
                                        >
                                          <p
                                            style={{
                                              marginBottom: 0,
                                              lineHeight: 1.5,
                                            }}
                                          >
                                            *This is auto-generated message from
                                            BLL Please don't reply to this
                                            message.
                                            <br />
                                            <span
                                              style={{ fontWeight: "bold" }}
                                            >
                                              Business Leadership League
                                            </span>
                                            <br />
                                            <span>
                                             {data.address}
                                            </span>
                                            <br />
                                            <span> </span>
                                          </p>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td height="15">&nbsp;</td>
                                      </tr>
                                      <tr>
                                        <td
                                          style={{
                                            fontSize: "1em",
                                            lineHeight: "1.2em",
                                            textAlign: "center",
                                          }}
                                        // style={{ fontSize: '1em',
                                        // lineHeight: '1.2em',
                                        // textAlign: 'center',
                                        // borderTop: '1px solid #000',}}
                                        >
                                          <p style={{ marginBottom: 0 }}>
                                            For any queries contact : {data.mobno1} {data.mobno2 == 'null' ?"":" / "+data.mobno2}
                                        
                                          </p>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </td>
                                <td width="5%"></td>
                              </tr>
                              <tr>
                                <td height="15">&nbsp;</td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                        <td width="5%"></td>
                      </tr>
                    </tbody>
                  </table>
                </td>
              </tr>
            </tbody>
          </table>
        </body>
      </html>
    </AnimationWrapper>
  );
};

export default ViewUserPass;
