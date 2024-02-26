import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ContactFormWrapper = styled.div`
  background-color: #1c2c42;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;

  .contact-head {
    text-align: center;
    color: white;
    font-size: xx-large;
    margin-bottom: 20px;
  }

  .para {
    color: white;
    max-width: 450px;
    text-align: center;
  }

  .ContactForm {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
  }

  form {
    margin-top: 20px;
    width: 100%; /* Set form width to 100% */
    background-color: white;
    border: 1px solid blue;
    border-radius: 10px;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    color: rgb(0, 0, 0);
    width: 100%;
    border: 1px solid black;
    border-radius: 5px;
    padding: 15px; /* Increase padding for top, bottom, and left */
    padding-right: 120px; /* Adjust padding on the right side */
    margin-top: 20px;
    box-sizing: border-box; /* Ensure padding and border are included in width */
  }

  button {
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 25px;
    background-color: blue;
    color: white;
  }

  .formRow {
    margin: 20px 0 20px 10px;
    display: flex;
    column-gap: 20px;
  }

  .contactForm {
    background-color: black;
    width: 100%; /* Set form width to 100% */
    max-width: 700px; /* Optionally, set a max-width */
    margin: auto;
    border-radius: 10px;
  }

  .errorMessage {
    color: red;
    font-size: 14px;
    margin-left: 20px;
    padding: 0;
  }

  @media (max-width: 768px) {
    .submit-message {
      width: 125px;
      margin-left: 200px;
    }
  }
`;
export const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [disabled, setDisabled] = useState(false);

  const onSubmit = async (data) => {
    const { name, email, subject, message } = data;
    try {
      setDisabled(true);
      toast.success("Form Submitted..We will get back to you soon.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      });
    } catch (e) {
      console.error(e);
    } finally {
      setDisabled(false);
      reset();
    }
  };

  return (
    <>
      <ContactFormWrapper>
        <div className="con-main">
          <br />
          <br />
          <br />
          <h1 className="contact-head">Contact Us</h1>
          <p className="para">
            if you have got any questions, please fill out the short form below,
            we promise to get back to you in lightning speed.
          </p>
          <br />
        </div>
        <div className="ContactForm">
          <div className="container">
            <div className="row">
              <div className="col-12 text-center">
                <div className="contactForm">
                  <form
                    id="contact-form"
                    onSubmit={handleSubmit(onSubmit)}
                    noValidate
                  >
                    {/* Form inputs */}
                    <div className="row formRow">
                      <div className="col-6">
                        <input
                          type="text"
                          name="name"
                          {...register("name", {
                            required: {
                              value: true,
                              message: "Please enter your name",
                            },
                            maxLength: {
                              value: 30,
                              message: "Please use 30 characters or less",
                            },
                          })}
                          className="form-control formInput contact-name"
                          placeholder="Name"
                        />
                        <br />
                        {errors.name && (
                          <span className="errorMessage">
                            {errors.name.message}
                          </span>
                        )}
                      </div>
                      <div className="col-6">
                        <input
                          type="email"
                          name="email"
                          {...register("email", {
                            required: true,
                            pattern:
                              /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                          })}
                          className="form-control formInput contact-mail"
                          placeholder="Email address"
                        />
                        <br />
                        {errors.email && (
                          <span className="errorMessage">
                            Please enter a valid email address
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row formRow">
                      <div className="col">
                        <input
                          type="text"
                          name="subject"
                          {...register("subject", {
                            required: {
                              value: true,
                              message: "Please enter a subject",
                            },
                            maxLength: {
                              value: 75,
                              message: "Subject cannot exceed 75 characters",
                            },
                          })}
                          className="form-control formInput sub"
                          placeholder="Title"
                        />
                        <br />
                        {errors.subject && (
                          <span className="errorMessage">
                            {errors.subject.message}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="row formRow">
                      <div className="col">
                        <textarea
                          rows={3}
                          name="message"
                          {...register("message", {
                            required: true,
                          })}
                          className="form-control formInput message"
                          placeholder="Message"
                        />
                        <br />
                        {errors.message && (
                          <span className="errorMessage">
                            Please enter a message
                          </span>
                        )}
                      </div>
                    </div>

                    <button
                      className="submit-btn btn btn-primary"
                      disabled={disabled}
                      type="submit"
                    >
                      Submit Now
                    </button>
                  </form>
                </div>
                <br />
              </div>
            </div>
          </div>
        </div>
        <ToastContainer />
      </ContactFormWrapper>
    </>
  );
};
