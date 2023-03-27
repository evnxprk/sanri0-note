import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

export default function CreateNotebook() {
    const {closeModal} = useModal()
    const dispatch = useDispatch()
    const history = useHistory()
    const sessionUser = useSelector((state) => state.session.user)

    const [name, setName] = useState()
    const [errors, setErrors] = useState([])
} 