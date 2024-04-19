import { createCandidateSchema, createPositionSchema, createVoterAccountSchema, migrationDataSchema, updateCandidateSchema, updatePositionSchema, updateVoterAccountSchema } from "$lib/schema";
import type { MigrationFile, PositionsDB } from "$lib/types";
import { fail, type Actions } from "@sveltejs/kit";
import type { ZodError } from "zod";


export const actions: Actions = {

    // all voter route actions
    activeVotingAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {

        const formData = await request.formData();
        const isActive = JSON.parse(formData.get("isActive") as string);
        const id = formData.get("id") as string;

        const { error: updateVotingError } = await supabaseAdmin.from("activate_vote").update([{
            voting_active: isActive
        }]).eq("id", Number(id));
        console.log(updateVotingError?.message)
        if (updateVotingError) return fail(401, { msg: updateVotingError.message });
        else return fail(200, { msg: "Success" });
    },

    createVoterAction: async ({ locals: { supabase, supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = createVoterAccountSchema.parse(formData);

            const { data: { user }, error: createVoterError } = await supabaseAdmin.auth.admin.createUser({
                email: result.email,
                password: result.password,
                email_confirm: true,
                user_metadata: {
                    classification: result.classification
                }
            });

            if (createVoterError) return fail(401, { msg: createVoterError.message });
            else if (user) {
                const { error: userInsert } = await supabaseAdmin.from("user_list_tb").insert([{
                    user_id: user.id,
                    classification: result.classification,
                    user_lrn: result.voterLrn,
                    user_password: result.password,
                    user_fullname: result.fullName,
                    user_email: result.email.toLowerCase(),
                    not_registered: false,
                    not_voted: true,
                }]);

                if (userInsert) {
                    const deleteUser = await supabaseAdmin.auth.admin.deleteUser(user.id);
                    return fail(401, { msg: userInsert.message });
                } else return fail(200, { msg: "Voter Account Created." });

            }


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            console.log(fieldErrors)
            return fail(400, { errors: fieldErrors });
        }
    },

    migrationAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = migrationDataSchema.parse(formData);
            const parseData = JSON.parse(result.migrationData) as MigrationFile[];
            const { error: migrationError } = await supabaseAdmin.rpc("bulk_insert_user_list", { data: parseData, classification_param: result.classification });

            if (migrationError) return fail(401, { msg: migrationError.message });
            else return fail(200, { msg: "Data Uploaded Successfully." });


        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }

    },

    updateVoterAccountAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updateVoterAccountSchema.parse(formData);

            if (result.userId === "no value") {

                const { error: updateDefaultVoterError } = await supabaseAdmin.from("user_list_tb").update([{
                    user_lrn: result.voterLrn,
                    user_password: result.password,
                    user_fullname: result.fullName,
                    classification: result.classification,
                    user_email: result.email

                }]).eq("id", result.voterId);
                if (updateDefaultVoterError) return fail(401, { msg: updateDefaultVoterError.message });
                else return fail(200, { msg: "Voter Information Updated." });
            }

            const { error: updateOrigVoterError } = await supabaseAdmin.from("user_list_tb").update([{
                user_lrn: result.voterLrn,
                user_password: result.password,
                user_fullname: result.fullName,
                classification: result.classification,
                user_email: result.email

            }]).eq("id", result.voterId);

            if (updateOrigVoterError) return fail(401, { msg: updateOrigVoterError.message });
            else {
                const { data: { user }, error: updateAuthError } = await supabaseAdmin.auth.admin.updateUserById(result.userId, {
                    email: result.email,
                    password: result.password
                });

                if (updateAuthError) return fail(401, { msg: updateAuthError.message });
                else if (user) return fail(200, { msg: "Voter Information Updated." });
            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    deleteVoterAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const voterId = formData.get("voterId") as string;
        const userId = formData.get("userId") as string;

        if (userId === "no value") {
            const { error: deleteVoterError } = await supabaseAdmin.from("user_list_tb").delete().eq("id", voterId);
            if (deleteVoterError) return fail(401, { msg: deleteVoterError.message });
            else return fail(200, { msg: "Account Deleted Successfully." })
        }

        const { error: deleteVoterError } = await supabaseAdmin.from("user_list_tb").delete().eq("id", voterId);

        if (deleteVoterError) return fail(401, { msg: deleteVoterError.message });
        else {
            const { error: deleteUserError } = await supabaseAdmin.auth.admin.deleteUser(userId);

            if (deleteUserError) return fail(401, { msg: deleteUserError.message });
            else return fail(200, { msg: "Account Deleted Successfully." });
        }

    },

    // position route actions
    createPositionAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());
        try {
            const result = createPositionSchema.parse(formData);

            const { error: createPositionError } = await supabaseAdmin.rpc("create_position", {
                classification_param: result.classification,
                position_name_param: result.positionName,
                maximum_votes_param: Math.abs(Number(result.maximumVotes))
            });

            if (createPositionError) return fail(401, { msg: createPositionError.message });
            else return fail(200, { msg: "Position Created Successfully." });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    updatePositionAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updatePositionSchema.parse(formData);

            const { error: updatePositonError } = await supabaseAdmin.from("created_positions_tb").update([{
                position_name: result.positionName,
                classification: result.classification,
                maximum_votes: result.maximumVotes
            }]).eq("id", result.positionId);

            if (updatePositonError) return fail(401, { msg: updatePositonError.message });
            else return fail(200, { msg: "Position Updated Successfully." });

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();
            return fail(400, { errors: fieldErrors });
        }
    },

    deletePositionAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const positionId = formData.get("positionId") as string;
        const positionName = formData.get("positionName") as string;
        const classification = formData.get("classification") as string;

        const { error: deletePositionError } = await supabaseAdmin.from("created_positions_tb").delete().eq("id", positionId);
        if (deletePositionError) return fail(401, { msg: deletePositionError.message });
        else {
            // will delete the all photos in bucket related to position this is stupid not atomic hope supabase will fix
            const { data } = await supabaseAdmin.storage.from("candidate_bucket").list(`${classification}/${positionName}`);
            if (data) {
                for (const item of data) {
                    await supabaseAdmin.storage.from("candidate_bucket").remove([`${classification}/${positionName}/${item.name}/${item.name}.webp`]);
                }
            };
            return fail(200, { msg: "Position Deleted Successfully." });
        }
    },

    // candidate actions
    createCandidateAction: async ({ locals: { supabaseAdmin, compressImage }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = createCandidateSchema.parse(formData);
            const position = JSON.parse(result.position) as PositionsDB;

            const convertedBlob = await compressImage(result.candidatePhoto);

            if (convertedBlob) {
                const { data: candidateBucket, error: uploadCandidatePhotoError } = await supabaseAdmin.storage.from("candidate_bucket").upload(`${result.classification}/${position.position_name}/${result.fullName}/${result.fullName}.webp`, convertedBlob, {
                    cacheControl: '3600',
                    upsert: false
                });

                if (uploadCandidatePhotoError) return fail(401, { msg: uploadCandidatePhotoError.message });
                else {

                    const { data: fileObject, error: fileObjectError } = await supabaseAdmin.storage.from("candidate_bucket").list(`${result.classification}/${position.position_name}/${result.fullName}`, { limit: 1, offset: 0 });

                    if (fileObjectError) return fail(401, { msg: fileObjectError.message });
                    else if (fileObject.length) {
                        const { data: { publicUrl } } = supabaseAdmin.storage.from("candidate_bucket").getPublicUrl(candidateBucket.path);
                        if (publicUrl) {
                            const { error: insertCandidateError } = await supabaseAdmin.from("created_candidates_tb").insert([{
                                position_id: position.id,
                                candidate_fullname: result.fullName,
                                candidate_motto: result.motto,
                                candidate_position: position.position_name,
                                candidate_photo_link: publicUrl,
                                classification: position.classification,
                                storage_id: fileObject[0].id,
                                vote_count: 0,
                                maximum_vote: position.maximum_votes,
                            }]);

                            if (insertCandidateError) return fail(401, { msg: insertCandidateError.message });
                            else return fail(200, { msg: "Candidate Successfully Created." });
                        }
                    }



                }
            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();

            return fail(400, { errors: fieldErrors });
        }
    },
    // lazy will continue soon
    /* updateCandidateAction: async ({ locals: { supabaseAdmin, compressImage }, request }) => {
        const formData = Object.fromEntries(await request.formData());

        try {
            const result = updateCandidateSchema.parse(formData);
            const position = JSON.parse(result.position) as PositionsDB;
            const convertedBlob = await compressImage(result.candidatePhoto);

            if (convertedBlob) {
                const { data: updateCandidateBucket, error: updateCandidateBucketError } = await supabaseAdmin.storage.from("candidate_bucket").update(`${result.classification}/${position.position_name}/${result.fullName}.webp`, convertedBlob, {
                    cacheControl: '3600',
                    upsert: false
                });

                if (updateCandidateBucketError) return fail(401, { msg: updateCandidateBucketError.message });
                else {

                    const { data: { publicUrl } } = supabaseAdmin.storage.from("candidate_bucket").getPublicUrl(updateCandidateBucket.path);
                    if (publicUrl) {
                        const { error: updateCandidateError } = await supabaseAdmin.from("created_candidates_tb").update([{
                            position_id: position.id,
                            candidate_fullname: result.fullName,
                            candidate_motto: result.motto,
                            candidate_position: position.position_name,
                            candidate_photo_link: publicUrl,
                            classification: position.classification,
                        }]);

                        if (updateCandidateError) return fail(401, { msg: updateCandidateError.message });
                        else return fail(200, { msg: "Candidate Successfully Updated." });
                    }

                }
            }

        } catch (error) {
            const zodError = error as ZodError;
            const { fieldErrors } = zodError.flatten();

            return fail(400, { errors: fieldErrors });
        }
    } */

    deleteCandidateAction: async ({ locals: { supabaseAdmin }, request }) => {
        const formData = await request.formData();
        const classification = formData.get("classification") as string;
        const position = formData.get("position") as string;
        const fullname = formData.get("fullname") as string;

        const { data: deleteCandidatePhoto, error: deleteCandidatePhotoError } = await supabaseAdmin.storage.from("candidate_bucket").remove([`${classification}/${position}/${fullname}/${fullname}.webp`])

        if (deleteCandidatePhotoError) return fail(401, { msg: deleteCandidatePhotoError.message });
        else if (deleteCandidatePhoto.length) return fail(200, { msg: "Candidate Deleted Successfully." });
    }

};