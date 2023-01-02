import { faCheck, faHeart, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { names, surnames } from "./names";

function App() {
  const [saved, setSaved] = useState([]);
  const [view, setView] = useState("New");
  const [img, setImg] = useState();
  const [name, setName] = useState();
  const [surname, setSurname] = useState();
  const [age, setAge] = useState();
  const [minAge, setMinAge] = useState(18);
  const [maxAge, setMaxAge] = useState(25);
  const [prefGender, setPrefGender] = useState("female");
  const [gender, setGender] = useState("female");

  const [person, setPerson] = useState();

  useEffect(() => {
    onSkip();
  }, []);

  const onLike = () => {
    setSaved((prevSaved) => [person, ...prevSaved]);
    onSkip();
  };

  const onShowLiked = () => {
    view === "New" ? setView("Liked") : setView("New");
  };

  const onRemoveLiked = (key) => {
    setSaved((prevSaved) => prevSaved.filter((person) => person.key !== key));
  };

  const onSkip = async () => {
    let call = await fetch(
      `https://fakeface.rest/face/json?minimum_age=${minAge}&maximum_age=${maxAge}&gender=${prefGender}`
    );
    let res = await call.json();
    let img = res.image_url;
    let gender = res.gender;
    let age = res.age;
    let name =
      prefGender === "female"
        ? names.female[Math.floor(Math.random() * names.female.length)]
        : names.male[Math.floor(Math.random() * names.male.length)];
    let surname = surnames[Math.floor(Math.random() * surnames.length)];
    setImg(img);
    setGender(gender);
    setAge(age);
    setName(name);
    setSurname(surname);
    setPerson({ name, img, age, surname, gender, key: Math.random() });
  };

  return (
    <div className="w-screen h-screen overflow-y-scroll flex flex-col gap-2 p-2 bg-blue-700">
      <h1 className="text-center text-5xl rounded-full bg-white w-fit m-auto px-6 py-3">
        Simulated Dating App
      </h1>
      {view === "Liked" ? (
        <div className="min-w-fit min-h-fit p-2 m-auto rounded-3xl flex flex-col gap-2 overflow-y-scroll">
          {saved.length !== 0 ? (
            saved.map((person) => {
              return (
                <div className="flex gap-2 w-fit">
                  <img
                    className="w-72 h-72 p-2 m-auto rounded-3xl"
                    alt="Person"
                    src={person.img}
                  ></img>
                  <div className="text-white text-3xl flex flex-col gap-4 w-80">
                    <p className="text-center">
                      {person.name} {person.surname}
                    </p>
                    <p className="text-center">
                      {person.age}{" "}
                      {person.gender.charAt(0).toUpperCase() +
                        person.gender.slice(1)}
                    </p>
                    <button
                      className="w-12 min-w-fit h-12 mx-auto bg-red-500 p-1 rounded-full hover:opacity-70 hover:w-14 hover:h-14"
                      onClick={() => onRemoveLiked(person.key)}
                    >
                      <FontAwesomeIcon icon={faXmark} />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-center text-white text-3xl">
              Is there really no one you like?
            </p>
          )}
        </div>
      ) : (
        <div>
          <img
            className="w-fit h-fit p-2 m-auto rounded-3xl"
            alt="Person"
            src={img}
          ></img>
          <div className="m-auto text-white text-4xl">
            <p className="text-center">
              {name} {surname}, {age}{" "}
              {gender.charAt(0).toUpperCase() + gender.slice(1)}
            </p>
          </div>
        </div>
      )}

      <div className="min-w-fit m-auto flex gap-20 p-2">
        {view === "Liked" ? (
          <button
            className="w-16 h-16 m-0 bg-blue-200 p-2 rounded-full hover:opacity-70 hover:w-20 hover:h-20"
            onClick={onShowLiked}
          >
            <FontAwesomeIcon icon={faHeart} />
          </button>
        ) : (
          <div className="min-w-fit m-auto flex gap-20 p-2">
            <button
              className="w-16 min-w-fit h-16 m-0 bg-green-400 p-2 rounded-full hover:opacity-70 hover:w-20 hover:h-20"
              onClick={onLike}
            >
              <FontAwesomeIcon icon={faCheck} />
            </button>
            <button
              className="w-16 min-w-fit h-16 m-0 bg-blue-200 p-2 rounded-full hover:opacity-70 hover:w-20 hover:h-20"
              onClick={onShowLiked}
            >
              <FontAwesomeIcon icon={faHeart} />
            </button>
            <button
              className="w-16 min-w-fit h-16 m-0 bg-red-500 p-2 rounded-full hover:opacity-70 hover:w-20 hover:h-20"
              onClick={onSkip}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
