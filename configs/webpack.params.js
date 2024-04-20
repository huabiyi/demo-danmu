const os = require("os").platform();

module.exports = {
	"require_path" : os == "linux" ? "/usr/local/lib/node_modules/" : "",
	"sprite_limit" : 8192,
	"include_host" : "http://test.163.com/",
	"encode" : "utf-8",
	"cdn_path_dist" : "https://test.nie.163.com/test_cdn/dhxy/m/h5/20220422153523/",
	"cdn_path_release" : "https://dhxy.res.netease.com/m/h5/20220422153523/"
}