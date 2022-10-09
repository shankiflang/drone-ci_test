import articlesSchema from "./articles"
import commentsSchema from "./comments"
import comments_likesSchema from "./comments_likes"
import rolesSchema from "./roles"
import presetsSchema from "./presets"
import usersSchema from "./users"
import foldersSchema from "./folders"
import permissionsSchema from "./permissions"
import filesSchema from "./files"
import revisionsSchema from "./revisions"
import activitySchema from "./activity"
import panelsSchema from "./panels"
import notificationsSchema from "./notifications"
import webhooksSchema from "./webhooks"
import sharesSchema from "./shares"
import flowsSchema from "./flows"
import dashboardsSchema from "./dashboards"
import operationsSchema from "./operations"

const exports: { name: string, schema: string }[] = [
   { name: "articles", schema: articlesSchema },
   { name: "comments", schema: commentsSchema },
   { name: "comments_likes", schema: comments_likesSchema },
   { name: "directus_roles", schema: rolesSchema },
   { name: "directus_presets", schema: presetsSchema },
   { name: "directus_users", schema: usersSchema },
   { name: "directus_folders", schema: foldersSchema },
   { name: "directus_permissions", schema: permissionsSchema },
   { name: "directus_files", schema: filesSchema },
   { name: "directus_revisions", schema: revisionsSchema },
   { name: "directus_activity", schema: activitySchema },
   { name: "directus_panels", schema: panelsSchema },
   { name: "directus_notifications", schema: notificationsSchema },
   { name: "directus_webhooks", schema: webhooksSchema },
   { name: "directus_shares", schema: sharesSchema },
   { name: "directus_flows", schema: flowsSchema },
   { name: "directus_dashboards", schema: dashboardsSchema },
   { name: "directus_operations", schema: operationsSchema }
];

export default exports;