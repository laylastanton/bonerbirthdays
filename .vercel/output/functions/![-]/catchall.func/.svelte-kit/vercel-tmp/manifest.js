export const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["robots.txt"]),
	mimeTypes: {".txt":"text/plain"},
	_: {
		client: {start:"_app/immutable/entry/start.HLB0Ag47.js",app:"_app/immutable/entry/app.CMzCaWPZ.js",imports:["_app/immutable/entry/start.HLB0Ag47.js","_app/immutable/chunks/plO4nNmV.js","_app/immutable/chunks/1BsYGyE3.js","_app/immutable/chunks/H2fWZ02E.js","_app/immutable/entry/app.CMzCaWPZ.js","_app/immutable/chunks/1BsYGyE3.js","_app/immutable/chunks/DVg1AVZ2.js","_app/immutable/chunks/gTmb0WSx.js","_app/immutable/chunks/H2fWZ02E.js","_app/immutable/chunks/BEba4Rpx.js","_app/immutable/chunks/BJxBUCtQ.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('../output/server/nodes/0.js')),
			__memo(() => import('../output/server/nodes/1.js')),
			__memo(() => import('../output/server/nodes/2.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/members",
				pattern: /^\/api\/members\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/members/_server.ts.js'))
			},
			{
				id: "/api/members/birthdays",
				pattern: /^\/api\/members\/birthdays\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/members/birthdays/_server.ts.js'))
			},
			{
				id: "/api/members/[id]",
				pattern: /^\/api\/members\/([^/]+?)\/?$/,
				params: [{"name":"id","optional":false,"rest":false,"chained":false}],
				page: null,
				endpoint: __memo(() => import('../output/server/entries/endpoints/api/members/_id_/_server.ts.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();
