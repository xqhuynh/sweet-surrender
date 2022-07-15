import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function EditForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  // Call on useParams to target id
  const params = useParams(); // { id: 2 }

  // Grab 'cakeDetail' cake from redux store
  const editCake = useSelector((store) => store.cakeDetail);

  // console.log("editCake is:", editCake);
  // useEffect to dispatch 'FETCH_ACTIVE_CAKE' on page load
  // refresh after page reload/load params.id by putting in empty array
  useEffect(() => {
    dispatch({
      type: "FETCH_ACTIVE_CAKE",
      payload: Number(params.id),
    });
  }, [params.id]);

  // On click handler for when submit button pressed w/dispatch 'SAVE_CAKE' and editCake payload
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch({
      type: "SAVE_CAKE",
      payload: editCake,
    });

    // Go back to Admin view using useHistory after saving cake edit
    history.push("/admin");
  };

  return (
    <>
      <h2>Update Cake</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          // This shows current cake name in input box
          value={editCake.name}
          // onChange  click event to target editCake.name as payload
          onChange={(evt) =>
            dispatch({
              type: "UPDATE_ACTIVE_CAKE",
              payload: { name: evt.target.value },
            })
          }
        />
        <input type="submit" value="Update Cake" />
      </form>
    </>
  );
}

export default EditForm;
