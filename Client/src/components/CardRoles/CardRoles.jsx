import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, changeRolUser } from "../../redux/actions";

export const CardRoles = ({ rol }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeStatus = (id, state) => {
    const change = state == 'Inactivo'?'Activo':'Inactivo';
    const response = confirm(`Esta seguro que cambiar el estado actual ${state} del usuario seleccionado`)
    if(response) {
        dispatch(deleteUser(id));
        alert(`El usuario seleccionado ahora esta como ${change}`);
        navigate("/admin");
        return true;
    }
    return false
  }

  const changeRol = (id, state) => {
    const change = state == 'user'?'admin':'user';
    const response = confirm(`Esta seguro que cambiar el usuario seleccionado de ${state} a ${change}`)
    if(response) {
        dispatch(changeRolUser(id));
        alert(`El usuario seleccionado ahora esta como ${change}`);
        navigate("/admin");
        return true;
    }
    return false
  }

  return (
    <>
      <div className="border my-1 rounded-lg text-xl p-5 flex align-middle justify-between">
        <p className="flex w-4/5 align-center mr-3 text-2xl">{rol.email}</p>
        <p className="flex w-1/5 align-middle text-2xl">{rol.name}</p>
        <p className="flex w-1/5 align-middle text-2xl">{rol.state.name}</p>

        <div className="flex w-1/3">
          <button
            onClick={() => changeStatus(rol.id, rol.state.name)}
            className="mr-5 bg-yellow-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >{rol.state.id === 1? 'Deshabilitar':'Habilitar'}
          </button>
          <button
            onClick={()=> changeRol(rol.id, rol.rol.name)}
            className="bg-red-400  w-full p-3 font-bold text-white rounded cursor-pointer hover:bg-sky-700 transition-colors"
            type="button"
          >{rol.rol.id === 1? 'Usuario':'Administrador'}
          </button>
        </div>
      </div>
    </>
  );
};