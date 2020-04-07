package main

import (
	"github.com/gopherjs/gopherjs/js"
	"github.com/jhead/phantom/internal/proxy"
)

//Defualts: RemoteServer "", BindAddress = "0.0.0.0", BindPort = 0 IdleTimeout = 60 (time.duration)

func main() {

	js.Module.Get("exports").Set("phantom", map[string]interface{}{
		"new": proxy.New,
	})

}
