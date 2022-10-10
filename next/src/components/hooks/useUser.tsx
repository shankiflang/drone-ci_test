import React from 'react';
import { useImage } from 'components/hooks/useImage';
import { useGetUserByIdQuery, Directus_Files, useUpdateUserByIdMutation } from 'graphql/generated/hooks'
import { directusFileUpload } from 'lib/files';



interface useUserProps {
    id?: string | number | null
    apiFirst?: Boolean
}



export const useUser = ({ id, apiFirst }: useUserProps) => {
    // recuperer le current user dans le cache ou le faire appeler une fois
    const { data, error, loading, refetch } = useGetUserByIdQuery({
        variables: {
            id: id?.toString() ?? '',
        },
        fetchPolicy: apiFirst ? 'network-only' : 'cache-first',
    })

    // recuperer url avatar de l'utilisateur connecté
    const { Image, src, updateImage } = useImage({
        image: (data?.users_by_id?.avatar as Directus_Files) ?? undefined,
        defaultImage: '/anonymous.webp',
        key: 'avatar',
        loading,
        refetch,
    })

    // recuperer le fullname de l'utilisateur connecté
    const userFullName = data?.users_by_id?.first_name
        ? data.users_by_id.first_name + (data.users_by_id.last_name ? ' ' + data.users_by_id.last_name : '')
        : 'Anonymous'

    // update le currentuser
    const [updateUser, { data: updateUserData, loading: updateUserLoading, error: updateUserError }] = useUpdateUserByIdMutation()

    // update l'avatar de l'user connecté
    const handleUpdateAvatar = async (e: any, item?: any) => {
        e.preventDefault()

        if (e?.target?.files && e?.target?.files[0]) {
            if (data?.users_by_id?.avatar) {
                await updateImage({ file: e.target.files[0], data })
            } else if (id) {
                let { data: newAvatar } = await directusFileUpload({ file: e.target.files[0], data: item })
                await updateUser({
                    variables: {
                        id: id.toString(),
                        data: {
                            avatar: {
                                ...newAvatar.data,
                            },
                        },
                    },
                })
            }
        }
    }

    return {
        user: data,
        userFullName: userFullName,
        loadingUser: loading,
        errorUser: error,
        refetchUser: refetch,
        updateCurrentUser: {
			update: updateUser,
			updateAvatar: handleUpdateAvatar,
			data: updateUserData,
			loading: updateUserLoading,
			error: updateUserError,
        },
        Avatar: Image,
        userAvatarSrc: src,
    };
};