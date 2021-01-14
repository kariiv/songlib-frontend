import login from "./login";
import Swal from "sweetalert2";


class ProviderError extends Error {
    constructor(message) {
        super(message);
        this.name = "ProviderError";
    }
}


export default class Provider {

    static async getAll(api, ObjClass) {
        const data = await (await fetch(api)).json()
        return data.map(o => new ObjClass(o));
    }

    static async create(api, obj, ObjClass) {
        if (!(obj instanceof ObjClass))
            throw new ProviderError('Input must be class of ' + ObjClass.name)

        const form = new FormData();
        for (const [key, value] of Object.entries(obj.getObject())) {
            if (value !== undefined && value !== null)
                form.append(key, value);
        }

        return await saveAlert(api, form)
    }

    static async edit(obj) {
        throw new ProviderError("Method not implemented!")
    }

    static async delete(id, api) {
        if (!api) throw new ProviderError("Delete function is missing 'api'")
        if (!id) throw new ProviderError("Delete function is missing 'id'")

        const form = new FormData();
        form.append('id', id)

        return await deleteAlert(api, form)
    }
}


export async function deleteAlert(api, form) {
    return await alert(api, form, alertDeleteSettings, alertDeleteSuccess, alertDeleteError)
}
export async function saveAlert(api, form) {
    return await alert(api, form, alertSaveSettings, alertSaveSuccess, alertSaveError)
}

export async function alert(api, form, alertNotification, alertSuccess, alertError) {
    const resAlert = await Swal.fire(alertNotification)
    return resAlert.isConfirmed ? await loginAlert(api, form, alertSuccess, alertError) : null;
}

export async function loginAlert(api, form, successSetting, errorSetting) {
    const pass = await login()
    if (pass === null) return null;
    form.append('pass', pass)

    const res = await sendForm(form, api);

    const { error } = res;
    if (error) {
        errorSetting.text = error
        Swal.fire(errorSetting)
    } else Swal.fire(successSetting)

    return error ? null : res
}

async function sendForm(form, api) {
    try {
        const res = await fetch(api, {method: 'POST', body: form})
        if (res.status !== 200)
            return { error: "Something went bad!" }
        return await res.json()
    } catch(err) {
        return { error: err.toString() };
    }
}


const alertSaveSettings = {
    title: 'Save?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonColor: '#1cc88a',
    cancelButtonColor: '#e74a3b',
    confirmButtonText: 'Save'
}
const alertSaveSuccess = {
    icon: 'success',
    title: 'Saved!',
    showConfirmButton: false,
    timer: 1200,
}
const alertSaveError = {
    icon: 'error',
    title: 'Not saved!',
    showConfirmButton: false,
    timer: 1500,
}

const alertDeleteSettings = {
    title: 'Delete?',
    text: 'You wont be able to revert this!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#e74a3b',
    cancelButtonColor: '#4e73df',
    confirmButtonText: 'Delete'
}
const alertDeleteSuccess = {
    icon: 'success',
    title: 'Deleted!',
    showConfirmButton: false,
    timer: 1200,
}
const alertDeleteError = {
    icon: 'error',
    title: 'Delete failed!',
    showConfirmButton: false,
    timer: 1500,
}
